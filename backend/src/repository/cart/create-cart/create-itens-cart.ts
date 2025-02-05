import { ICreateItensCartRepository } from "../../../controllers/cart/create-cart/protocols";
import { Products } from "../../../models/Products";
import { MyCard, User } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoCreateItensCartRepository
  implements ICreateItensCartRepository
{
  async createItensCart(Id: string, tokenId: string): Promise<User> {
    const ProductFind = await Products.findOne({ _id: Id }).lean();

    if (!ProductFind) {
      throw new Error("Product not found");
    }

    const UserFind = await Users.findOne({ _id: tokenId }).lean();

    const copyUsersCartItens: MyCard[] = UserFind!.CartItens ?? [];
    const existUsersCartItens = copyUsersCartItens.find(
      (product) => product.productId === ProductFind!._id.toHexString()
    );
    if (existUsersCartItens) {
      const newItens = {
        ...existUsersCartItens,
        quantity: existUsersCartItens.quantity + 1,
      };

      const newUserCartItens = copyUsersCartItens.map((product) =>
        product.productId === ProductFind!._id.toHexString()
          ? newItens
          : product
      );

      const newUser = {
        ...UserFind!,
        CartItens: newUserCartItens,
      };

      await Users.updateOne({ _id: tokenId }, { $set: newUser });
    } else {
      const { _id, name, price, img } = ProductFind!;

      const MyCard = {
        productId: _id.toHexString(),
        img: img[0],
        productName: name,
        price: price,
        quantity: 1,
      };

      let newCopyCartItens = [];

      if (!UserFind!.CartItens) {
        newCopyCartItens.push(MyCard);
      } else {
        newCopyCartItens = [...UserFind!.CartItens, MyCard];
      }

      const newUser = {
        ...UserFind!,
        CartItens: newCopyCartItens,
      };

      await Users.updateOne({ _id: tokenId }, { $set: newUser });
    }

    const User = await Users.findOne({ _id: tokenId }).lean();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...rest } = User!;

    return { id: _id.toHexString(), ...rest };
  }
}

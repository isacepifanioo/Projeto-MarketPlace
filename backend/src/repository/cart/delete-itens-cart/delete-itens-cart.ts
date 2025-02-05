import { IDeleteItensCartRepository } from "../../../controllers/cart/delete-itens-cart/protocols";
import { MyCard } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoDeleteItensCartRepository
  implements IDeleteItensCartRepository
{
  async deleteItensCart(idProduct: string, tokenId: string): Promise<MyCard[]> {
    const User = await Users.findOne({ _id: tokenId }).lean();

    const existCartItens: MyCard = User!.CartItens.find(
      (product) => product.productId === idProduct
    );

    if (existCartItens) {
      if (existCartItens.quantity > 1) {
        const newCartItens = {
          ...existCartItens!,
          quantity: existCartItens.quantity - 1,
        };

        const newCartItensUSer = User!.CartItens.map((product) =>
          product.productId === idProduct ? newCartItens : product
        );

        const newUser = {
          ...User!,
          CartItens: newCartItensUSer,
        };

        await Users.updateOne({ _id: tokenId }, { $set: newUser });
      } else {
        const newUserCartItens: MyCard[] = User!.CartItens.filter(
          (product) => product.productId !== idProduct
        );
        const newUser = {
          ...User!,
          CartItens: newUserCartItens,
        };

        await Users.updateOne({ _id: tokenId }, { $set: newUser });
      }

      const UserUpdate = await Users.findOne({ _id: tokenId }).lean();

      const copyCartItens: MyCard[] = UserUpdate!.CartItens ?? [];

      return copyCartItens;
    } else {
      const UserUpdate = await Users.findOne({ _id: tokenId }).lean();

      const copyCartItens: MyCard[] = UserUpdate!.CartItens ?? [];

      return copyCartItens;
    }
  }
}

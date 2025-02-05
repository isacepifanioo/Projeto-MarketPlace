import { ICreatePurchaseProductsRepository } from "../../../controllers/purchase/create-purchase-product/protocols";
import { Products } from "../../../models/Products";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoCreatePurchaseProducts
  implements ICreatePurchaseProductsRepository
{
  async PurchaseProduct(idProduct: string, tokenId: string): Promise<User> {
    const Product = await Products.findOne({ _id: idProduct }).lean();
    const User = await Users.findOne({ _id: tokenId }).lean();

    let UsersUpdate;

    const copyPurchaseHistory = User!.purchaseHistory ?? [];
    const existProduct = copyPurchaseHistory.find((product) => {
      const { _id } = Product!;
      return product.productId === _id.toHexString();
    });

    if (existProduct) {
      const newUSerProducts = {
        ...existProduct,
        quantity: existProduct.quantity + 1,
      };

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, purchaseHistory, ...rest } = User!;

      const filterPurchase = copyPurchaseHistory.map((product) =>
        product.productId === Product!._id.toHexString()
          ? newUSerProducts
          : product
      );

      UsersUpdate = {
        purchaseHistory: filterPurchase,
        ...rest,
      };

      await Users.updateOne({ _id: tokenId }, { $set: UsersUpdate });
    } else {
      const { _id, name, price } = Product!;
      const data = new Date();
      const newDate = data.getDate() + '/' + data.getMonth() + 1 + '/' + data.getFullYear()

      const newPurchase = {
        productId: _id.toHexString(),
        productName: name,
        quantity: 1,
        price: price,
        date: newDate,
      };
      let updatePushHistory = [];

      if(!User!.purchaseHistory)  {
        updatePushHistory.push(newPurchase)
      } else {
        updatePushHistory = [...User!.purchaseHistory, newPurchase]
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { purchaseHistory, ...rest } = User!;

      UsersUpdate = {
        purchaseHistory: updatePushHistory,
        ...rest,
      };

      await Users.updateOne({ _id: tokenId }, { $set: UsersUpdate });
    }
    
    const QtyPurchase = Product!.qtyPurchase ?? 0

    const productUpdate = {
      ...Product!,
      qtyPurchase: QtyPurchase + 1
    }

    await Products.updateOne({ _id: idProduct }, { $set: productUpdate })

    const newUser = await Users.findOne({ _id: tokenId }).lean();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...rest } = newUser!;

    return { id: _id.toHexString(), ...rest };
  }
}

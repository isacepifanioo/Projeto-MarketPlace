import {
  ICreateProductsRepository,
  IMongoCreateProductsParams,
} from "../../../controllers/products/create-products/protocols";
import { Products } from "../../../models/Products";
import { IProducts } from "../../../models/protocols";

export class MongoCreateProductsRepository
  implements ICreateProductsRepository
{
  async createProducts(
    product: IMongoCreateProductsParams
  ): Promise<IProducts> {
    const myProduct = new Products(product);

    const saveproducts = await myProduct.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, qtyReviews, reviews, ...rest } = saveproducts.toObject()!;

    return { id: _id.toHexString(), ...rest };
  }
}

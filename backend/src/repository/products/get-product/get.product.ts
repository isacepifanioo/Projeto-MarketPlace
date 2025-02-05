import { IGetProductRepository } from "../../../controllers/products/get-product/protocols";
import { Products } from "../../../models/Products";
import { IProducts } from "../../../models/protocols";

export class MongoGetProductRepository implements IGetProductRepository {
    async getProduct(id: string): Promise<IProducts> {
        const product = await Products.findOne({_id: id}).lean()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, ...rest } = product!

        return { id: _id.toHexString(), ...rest }
    }
}
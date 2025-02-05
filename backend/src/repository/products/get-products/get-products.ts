import { IGetProductsRepository } from "../../../controllers/products/get-products/protocols";
import { Products } from "../../../models/Products";
import { IProducts } from "../../../models/protocols";

export class MongoGetProductsRepository implements IGetProductsRepository {
    async getProducts(): Promise<IProducts[]> {
        const products = await Products.find().lean()

        const filterProducts = products.map(product => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, __v, qtyReviews, ...rest } = product
            const qty = rest.reviews.length
            return {id: _id.toHexString(), qtyReviews: qty, ...rest}
        })

        return filterProducts
    }
}
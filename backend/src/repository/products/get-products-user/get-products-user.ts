import { IGetProductUserRepository } from "../../../controllers/products/get-products-user/protocols";
import { Products } from "../../../models/Products";
import { IProducts } from "../../../models/protocols";

export class MongoGetProductUserRepository implements IGetProductUserRepository {
    async getProductsUser(tokenId: string): Promise<IProducts[]> {
        const products = await Products.find({userId: tokenId}).lean()

        const newProduct = products.map(product => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { _id, __v, ...restProduct } = product
            return {id: _id.toHexString(), ...restProduct}
        })
        return newProduct
    }
}
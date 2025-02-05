import { IDeleteProductsRepository } from "../../../controllers/products/delete-products/protocols";
import { Products } from "../../../models/Products";
import { IProducts } from "../../../models/protocols";

export class MongoDeleteProductsRepository implements IDeleteProductsRepository {
    async deleteUser(id: string): Promise<IProducts> {
        const product = await Products.findOne({_id: id}).lean()

        if(!product) {
            throw new Error('Aplicação foi quebrada apos o produto não ser encontrado')
        }

        await Products.deleteOne({_id: id})

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id,  __v, qtyStars, ...rest} = product!

        return {id: _id.toHexString(), qtyStars: rest.reviews.length, ...rest}
    }
}
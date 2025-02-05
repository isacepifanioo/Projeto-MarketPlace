import { ICreateProductsParams } from "../../../controllers/products/create-products/protocols";
import { IUpdateProductsRepository } from "../../../controllers/products/update-products/protocols";
import { Products } from "../../../models/Products";
import { IProducts } from "../../../models/protocols";

export class MongoUpdateProductsRepository implements IUpdateProductsRepository {
    async updateProducts(createProductsParams: ICreateProductsParams, id: string): Promise<IProducts> {
        const {acknowledged} = await Products.updateOne({_id: id}, {$set: createProductsParams}).lean()
        if(!acknowledged) {
            throw new Error('Algo deu errado ao tenta atualizar')
        }

        const product = await Products.findOne({_id: id}).lean()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {_id, __v, ...rest} = product!

        return {id: _id.toHexString(), ...rest}
    }
}
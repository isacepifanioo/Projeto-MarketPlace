import { IGetPurchaseProductRepository } from "../../../controllers/purchase/get-purchase-product/prococols";
import { Products } from "../../../models/Products";
import { Purchase } from "../../../models/protocols";
import { Users } from "../../../models/Users";

// pega o User autenticado e os Purchase 

// verifica se existe o o produto no purchaseHistory do usuario

// caso exista eu filtro o unico e retorno o Purchase caso não exista eu mando um erro

export class MongoGetPurchaseProductRepository implements IGetPurchaseProductRepository {
    async getPurchaseProducts(idProduct: string, tokenId: string): Promise<Purchase | undefined> {
        const ProductFind = await Products.findOne({_id: idProduct}).lean()

        if(!ProductFind) {
            throw new Error('product not found')
        }

        const User = await Users.findOne({_id: tokenId}).lean()

        if(!User) {
            throw new Error('User not found')
        }

        const copyPurchaseHistory: Purchase[] = User!.purchaseHistory ?? []

        const existPurchase = copyPurchaseHistory.find(product => product.productId === ProductFind!._id.toHexString())

        return existPurchase
    }
}
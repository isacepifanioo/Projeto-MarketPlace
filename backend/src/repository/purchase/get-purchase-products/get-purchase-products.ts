import { IGetPurchaseProductsRepository } from "../../../controllers/purchase/get-purchase-products/protocols";
import { Purchase } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoGetPurchaseProductsRepository implements IGetPurchaseProductsRepository  {
    async getPurchaseProducts(tokenId: string): Promise<Purchase[]> {
        const User = await Users.findOne({_id: tokenId}).lean()

        const PurchaseHistory: Purchase[] = User!.purchaseHistory ?? []

        return PurchaseHistory
    }
}
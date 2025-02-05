import { Purchase } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IGetPurchaseProductsController, IGetPurchaseProductsRepository } from "./protocols";
import jwt from 'jsonwebtoken'

export class GetPruchaseProductsController implements IGetPurchaseProductsController {
    constructor(private readonly getPurchaseProductsRepository:IGetPurchaseProductsRepository) {}
    async handle(token: string): Promise<httpRespose<Purchase[]>> {
        try {
            const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload

            const PurchaseHistory = await this.getPurchaseProductsRepository.getPurchaseProducts(tokenId.id)

            if(PurchaseHistory.length === 0) {
                return {
                    StatusCode: 200,
                    Body: "Você não comprou nenhum produto"
                }
            }

            return {
                StatusCode: 200,
                Body: PurchaseHistory
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return {
                StatusCode: 500,
                Body: "Somenthing went wrong"
            }
        }
    }
}
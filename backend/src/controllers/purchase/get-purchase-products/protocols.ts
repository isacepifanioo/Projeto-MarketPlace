import { Purchase } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IGetPurchaseProductsController {
    handle(token: string): Promise<httpRespose<Purchase[]>>
}

export interface IGetPurchaseProductsRepository {
    getPurchaseProducts(tokenId: string): Promise<Purchase[]>
}
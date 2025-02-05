import { Purchase } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IGetPurchaseProductController {
    handle(idProduct: string, token: string): Promise<httpRespose<Purchase>>
}

export interface IGetPurchaseProductRepository {
    getPurchaseProducts(idProduct: string, tokenId: string): Promise<Purchase | undefined>
}
import { User } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface ICreatePurchaseProductsController {
    handle(idProduct: string, token: string): Promise<httpRespose<User>>
}

export interface ICreatePurchaseProductsRepository {
    PurchaseProduct(idProduct: string, tokenId: string): Promise<User>
}
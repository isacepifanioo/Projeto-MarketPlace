import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IGetProductUSerController {
    handle(token: string): Promise<httpRespose<IProducts[]>>
}

export interface IGetProductUserRepository {
    getProductsUser(tokenId: string): Promise<IProducts[]>
}
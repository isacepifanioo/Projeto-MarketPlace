import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IDeleteProductsController {
    handle(id: string, token: string): Promise<httpRespose<IProducts>>
}

export interface IDeleteProductsRepository {
    deleteUser(id: string): Promise<IProducts>
}
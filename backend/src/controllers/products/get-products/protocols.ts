import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IGetProductsController {
    handle(): Promise<httpRespose<IProducts[]>>
}

export interface IGetProductsRepository {
    getProducts(): Promise<IProducts[]>
}
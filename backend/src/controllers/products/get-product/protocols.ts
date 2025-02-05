import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IGetProductController {
    handle(id: string): Promise<httpRespose<IProducts>>
}

export interface IGetProductRepository {
    getProduct(id: string): Promise<IProducts>
}
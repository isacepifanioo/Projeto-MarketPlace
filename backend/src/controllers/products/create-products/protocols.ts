import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface ICreateProductsController {
    handle(productsParms: ICreateProductsParams, token: string): Promise<httpRespose<IProducts>>
}

export interface ICreateProductsRepository {
    createProducts(product: IMongoCreateProductsParams): Promise<IProducts>
}

export interface ICreateProductsParams {
    img: string[],
    name: string,
    price: number,
    description: string
}
export interface IMongoCreateProductsParams {
    img: string[],
    name: string,
    price: number,
    description: string,
    userId: string
}
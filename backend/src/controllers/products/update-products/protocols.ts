import { IProducts } from "../../../models/protocols"
import { httpRespose } from "../../protocols"
import { ICreateProductsParams } from "../create-products/protocols"

export interface IUpdateProductsController {
    handle(createProductsParams: ICreateProductsParams, id: string, token: string): Promise<httpRespose<IProducts>>
}

export interface IUpdateProductsRepository {
    updateProducts(createProductsParams: ICreateProductsParams, id: string): Promise<IProducts>
} 
import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IGetProductController, IGetProductRepository } from "./protocols";

export class GetProductController implements IGetProductController {
    constructor (private readonly getProductRepository: IGetProductRepository) {}
    async handle(id: string): Promise<httpRespose<IProducts>> {
        try {
            if(!id) {
                return {
                    StatusCode: 400,
                    Body: "o campo id não pode ser vazio"
                }
            }

            const product = await this.getProductRepository.getProduct(id)

            if(!product) {
                return {
                    StatusCode: 404,
                    Body: "Esse produto não existe"
                }
            }

            return {
                StatusCode: 200,
                Body: product
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
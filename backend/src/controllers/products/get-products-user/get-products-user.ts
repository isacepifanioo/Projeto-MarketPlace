import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IGetProductUSerController, IGetProductUserRepository } from "./protocols";
import jwt from 'jsonwebtoken'

export class GetProductUSerController implements IGetProductUSerController {
    constructor(private readonly getProductUserRepository: IGetProductUserRepository){}
    async handle(token: string): Promise<httpRespose<IProducts[]>> {
        try {
            const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload
            const MyProducts = await this.getProductUserRepository.getProductsUser(tokenId.id)
            if(MyProducts.length === 0) {
                return {
                    StatusCode: 404,
                    Body: "Você não tem Nenhum Produto criado"
                }
            }
            return {
                StatusCode: 200,
                Body: MyProducts
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
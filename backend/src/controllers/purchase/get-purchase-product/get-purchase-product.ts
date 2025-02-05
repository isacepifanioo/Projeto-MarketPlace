import jwt from "jsonwebtoken";
import { Purchase } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IGetPurchaseProductController, IGetPurchaseProductRepository } from "./prococols";
import { Products } from "../../../models/Products";

export class GetPurchaseProductController implements IGetPurchaseProductController{
    constructor(private readonly getPurchaseProductRepository: IGetPurchaseProductRepository) {}
    async handle(id: string, token: string): Promise<httpRespose<Purchase>> {
        try {
            if(!id) {
                return {
                    StatusCode: 400,
                    Body: "Esse produto não foi encontrado"
                }
            }

            const ProductFind = await Products.findOne({_id: id}).lean()

            if(!ProductFind) {
                return {
                    StatusCode: 404,
                    Body: "Não foi possivel encontrar esse produto"
                }
            }
            
            const tokenId = jwt.verify(token, 'nossoSecret') as jwt.JwtPayload

            if(tokenId.id === ProductFind?.userId) {
                return {
                    StatusCode: 403,
                    Body: "Não é possivel ter seu Proprio Produto no Historico de Compras"
                }
            }

            const ProductHistory = await this.getPurchaseProductRepository.getPurchaseProducts(id, tokenId.id)

            if(!ProductHistory){
                return {
                    StatusCode: 404,
                    Body: "Não foi possivel encontrar esse produto no Seu historico de compras"
                }
            }

            return {
                StatusCode: 200,
                Body: ProductHistory
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
import { Address } from "../../../models/Address";
import { Products } from "../../../models/Products";
import { User } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { ICreatePurchaseProductsController, ICreatePurchaseProductsRepository } from "./protocols";
import jwt from 'jsonwebtoken'

export class CreatePurchaseProductController implements ICreatePurchaseProductsController {
    constructor(private readonly createPurchaseProductsRepository: ICreatePurchaseProductsRepository) {}
    async handle(idProduct: string, token: string): Promise<httpRespose<User>> {
        try {
            
            if(!idProduct) {
                return {
                    StatusCode: 400,
                    Body: "Não e possivel acessa esse produto"
                }
            }

            const product = await Products.findOne({_id: idProduct}).lean()

            const tokenId = jwt.verify(token, 'nossoSecret') as jwt.JwtPayload

            const existAddress = await Address.findOne({userId: tokenId.id})

            if(!existAddress) {
                return {
                    StatusCode: 422,
                    Body: "Você precisa Adiciona seu endereço"
                }
            }

            if(tokenId.id === product?.userId) {
                return {
                    StatusCode: 403,
                    Body: "Você não pode comprar seus proprios produto"
                }
            }

            const User = await this.createPurchaseProductsRepository.PurchaseProduct(idProduct, tokenId.id)

            if(!User) {
                return {
                    StatusCode: 404,
                    Body: "Não encontramos o seu usuario. Tente novamente"
                }
            }

            return {
                StatusCode: 200,
                Body: User
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
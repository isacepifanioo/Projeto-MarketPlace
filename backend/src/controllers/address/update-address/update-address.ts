import { Address } from "../../../models/Address";
import { IAddress } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IReqBodyAddress } from "../create-address/protocols";
import { IUpdateAddressController, IUpdateAddressRepository } from "./protocols";
import jwt from 'jsonwebtoken'

export class UpdateAddressController implements IUpdateAddressController {
    constructor(private readonly updateAddressRepository: IUpdateAddressRepository){}
    async handle(AddressParams: IReqBodyAddress, token: string): Promise<httpRespose<IAddress>> {
        try {
            const KeyAddress = ["street","number","complement","neighborhood","city","portalCode"]
            
            for(const key of KeyAddress) {
                if(!AddressParams?.[key as keyof IReqBodyAddress]) {
                    return {
                        StatusCode: 400,
                        Body: `O campo ${key} não pode está vazio`,
                    }
                }
            }

            
            const tokenId = jwt.verify(token, 'nossoSecret') as jwt.JwtPayload

            const existAddress = await Address.findOne({userId: tokenId.id}).lean()

            if(!existAddress) {
                return {
                    StatusCode: 404,
                    Body: "Nenhum Endereço foi encontrado. Crie um novo Endereço ou tente novamante"
                }
            }

            if(existAddress!.userId !== tokenId.id) {
                return {
                    StatusCode: 403,
                    Body: "Você não tem autorização para editar esse Endereço"
                }
            }
            
            const newAddressUpdate = {
                ...AddressParams,
                userId: tokenId.id
            }

            const AddressUpate = await this.updateAddressRepository.updateAddress(newAddressUpdate, tokenId.id)

            if(!AddressUpate) {
                return {
                    StatusCode: 204,
                    Body: "Não foi possivel encontrar o usuario"
                }
            }

            return {
                StatusCode: 200,
                Body: AddressUpate
            }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            return {
                StatusCode: 500,
                Body: "Somenthing went wrong",
              };
        }
    }
}
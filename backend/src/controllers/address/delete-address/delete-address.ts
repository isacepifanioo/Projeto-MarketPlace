import { IAddress } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IDeleteAddressController, IDeleteAddressRepository} from "./protocols";
import jwt from 'jsonwebtoken'

export class DeleteAddressController implements IDeleteAddressController {
    constructor(private readonly deleteAddressRepository: IDeleteAddressRepository){}
    async handle(token: string): Promise<httpRespose<IAddress>> {
        try {
            const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload

            const Address = await this.deleteAddressRepository.deleteAddress(tokenId.id)

            if(!Address) {
                return {
                    StatusCode: 404,
                    Body: "Não foi possivel encontrar seu Endereço, tente novamnete ou crie um novo Endereço"
                }
            }

            return {
                StatusCode: 200,
                Body: Address
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
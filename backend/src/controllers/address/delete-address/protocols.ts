import { IAddress } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IDeleteAddressController {
    handle(token: string): Promise<httpRespose<IAddress>>
}

export interface IDeleteAddressRepository {
    deleteAddress(tokenId: string): Promise<IAddress>
}
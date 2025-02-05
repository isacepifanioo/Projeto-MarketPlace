import { IAddress } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IGetAddressController {
    handle(token: string): Promise<httpRespose<IAddress>>
}

export interface IGetAddressRepsitory {
    getAddress(tokenId: string): Promise<IAddress>
}
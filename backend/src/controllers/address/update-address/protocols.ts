import { IAddress } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IReqBodyAddress } from "../create-address/protocols";

export interface IUpdateAddressController {
    handle(AddressParams: IReqBodyAddress, token: string): Promise<httpRespose<IAddress>>
}

export interface IUpdateAddressRepository {
    updateAddress(address: IAddress, tokenId: string): Promise<IAddress>
}
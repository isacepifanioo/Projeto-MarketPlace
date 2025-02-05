import { IAddress } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface ICreateAddressController {
    handle(address: IReqBodyAddress, token: string): Promise<httpRespose<IAddress>>
}

export interface ICreateAddressRepository {
    createAddress(address: IAddress): Promise<IAddress>
}

export interface IReqBodyAddress {
    street: string, 
    number: string, 
    complement: string, 
    neighborhood: string, 
    city: string, 
    portalCode: string 
}
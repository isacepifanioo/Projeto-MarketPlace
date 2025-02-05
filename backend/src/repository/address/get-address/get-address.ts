import { IGetAddressRepsitory } from "../../../controllers/address/get-address/protocols";
import { Address } from "../../../models/Address";
import { IAddress } from "../../../models/protocols";

export class MongoGetAddressRepsitory implements IGetAddressRepsitory {
    async getAddress(tokenId: string): Promise<IAddress> {
        const address = await Address.findOne({userId: tokenId}).lean()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const {_id, __v, ...AddressRest} = address!

        return AddressRest
    }
}
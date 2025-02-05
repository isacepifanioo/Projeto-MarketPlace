import { IUpdateAddressRepository } from "../../../controllers/address/update-address/protocols";
import { Address } from "../../../models/Address";
import { IAddress } from "../../../models/protocols";

export class MongoUpdateAddressRepository implements IUpdateAddressRepository {
    async updateAddress(address: IAddress, tokenId: string): Promise<IAddress> {
        const { modifiedCount } = await Address.updateOne({userId: tokenId}, {$set: address})
        
        if(modifiedCount === 0) {
            throw new Error("unable to update")
        }

        const AddressUpdate = await Address.findOne({userId: tokenId}).lean()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, ...restAddress } = AddressUpdate!

        return restAddress
    }
}
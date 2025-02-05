import { IDeleteAddressRepository } from "../../../controllers/address/delete-address/protocols";
import { Address } from "../../../models/Address";
import { IAddress } from "../../../models/protocols";

export class MongoDeleteAddressRepository implements IDeleteAddressRepository {
    async deleteAddress(tokenId: string): Promise<IAddress> {
        const AddressFind = await Address.findOne({userId: tokenId}).lean()

        const {deletedCount} = await Address.deleteOne({userId: tokenId})

        if(deletedCount === 0) {
            throw new Error("Address not deleted")
        }

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, ...DeletedAddress } = AddressFind!

        return DeletedAddress
    }
}
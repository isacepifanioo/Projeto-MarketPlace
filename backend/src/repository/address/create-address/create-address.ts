import { ICreateAddressRepository } from "../../../controllers/address/create-address/protocols";
import { Address } from "../../../models/Address";
import { IAddress } from "../../../models/protocols";
export class MongoCreateAddressRepository implements ICreateAddressRepository {
  async createAddress(address: IAddress): Promise<IAddress> {
    const newAddress = new Address(address)
    await newAddress.save()
    const AddressFind = await Address.findOne({userId: address.userId}).lean()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...AddressUser } = AddressFind!

    return AddressUser
  }
}

import { IGetUserRepository } from "../../../controllers/users/get-user/protocols";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoGetUserRepository implements IGetUserRepository {
  async getUsers(params: string): Promise<User> {
    if (!params) {
      throw new Error("O campo id esta invalido ou vazio");
    }

    const User = await Users.findOne({ _id: params }).lean();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {_id, __v, ...rest} = User!

    return { id: _id.toHexString(), ...rest }
  }
}

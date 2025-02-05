import { IGetUsersRepository } from "../../../controllers/users/get-users/protocols";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoGetUsersRepository implements IGetUsersRepository {
  async getUsers(): Promise<User[]> {
    const users = await Users.find().lean()

    const User = users.map(value => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, __v, ...rest } = value
      return { id: _id.toHexString(), ...rest }
    })

    return User
  }
}

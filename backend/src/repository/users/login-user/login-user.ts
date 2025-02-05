import {
  CreateLoginUserParams,
  ILoginUserRepository,
} from "../../../controllers/users/login-user/protocols";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoLoginUserRepository implements ILoginUserRepository {
  async loginUser(body: CreateLoginUserParams): Promise<User | undefined> {
    const User = await Users.findOne({ email: body.email }).lean();
    let myUser: User | undefined

    if(User) {
        const { _id, ...rest } = User!;
        myUser = { id: _id.toHexString(), ...rest }
    } else {
        myUser = undefined
    }
    

    return myUser;
  }
}

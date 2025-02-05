import { IUpdateUserRepository, UpdateUserParams } from "../../../controllers/users/update-user/protocols";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoUpdateUserRepository implements IUpdateUserRepository {
    async updateUser(id: string, body: UpdateUserParams): Promise<User> {
        await Users.updateOne({_id: id}, {$set: body})

        const User = await Users.findOne({_id: id}).lean()

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { _id, __v, ...rest } = User!

        return { id: _id.toHexString(), ...rest }
    }
}
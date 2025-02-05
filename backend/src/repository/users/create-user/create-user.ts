import { httpRequest } from "../../../controllers/protocols";
import { CreateUserParams, IcreateUserRepository } from "../../../controllers/users/create-user/protocols";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoCreateUserRepository implements IcreateUserRepository {
    async createUser({ body }: httpRequest<CreateUserParams>): Promise<User> {
        try {

           const userClass = new Users(body)

           const { id } = await userClass.save()

           const UserFindOne = await Users.findById({_id: id}).lean()

           if(!UserFindOne) {
            throw new Error('Não foi possivel cadastrar Esse usuario')
           }

           // eslint-disable-next-line @typescript-eslint/no-unused-vars
           const { _id, __v, ...rest } = UserFindOne

           return { id: _id.toHexString(), ...rest }

           
            
        } catch (error) {
            console.log(error);
            throw new Error('Algo deu errado ao tenta manda o user no mongo')
        }
    }
}
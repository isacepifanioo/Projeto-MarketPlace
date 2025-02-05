import { createToken } from "../../../helper/create-token";
import { User } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { CreateLoginUserParams, ILoginUserController, ILoginUserRepository } from "./protocols";
import bcrypt from 'bcrypt'

export class LoginUserController implements ILoginUserController {
    constructor(private readonly LoginUserRepository: ILoginUserRepository){}
    async handle(body: CreateLoginUserParams): Promise<httpRespose<User>> {
        // const User = await Users.findOne({email: body.email}).lean()

        const User = await this.LoginUserRepository.loginUser(body)

        if(!User?.email) {
            return {
                StatusCode: 400,
                Body: "Você não esta cadastrado no sistema"
            }
        }

        const isPasswordValid = bcrypt.compareSync(body.password, User.password)

        if(!isPasswordValid) {
            return {
                StatusCode: 400,
                Body: "A senha esta incorreta"
            }
        }

        const token = createToken(User)

        return {
            StatusCode: 200,
            Body: User,
            token: token
        }
    }
}
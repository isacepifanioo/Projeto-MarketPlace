import { User } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface ILoginUserController {
    handle(body: CreateLoginUserParams): Promise<httpRespose<User>>
}

export interface ILoginUserRepository {
    loginUser(body: CreateLoginUserParams): Promise<User | undefined>
}

export interface CreateLoginUserParams {
    email: string,
    password: string
}
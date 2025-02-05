import { User } from "../../../models/protocols";
import { httpRequest, httpRespose } from "../../protocols";

export interface IUpdateUserController {
    handle({ params, body }: httpRequest<UpdateUserParams>): Promise<httpRespose<User>>
}

export interface IUpdateUserRepository {
    updateUser( id: string, body: UpdateUserParams): Promise<User>
}

export interface UpdateUserParams {
    img: string,
    name: string,
    lastname: string,
    age: number,
    password: string,
    confirmPassword: string,
}
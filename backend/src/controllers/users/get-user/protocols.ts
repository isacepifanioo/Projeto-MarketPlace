import { User } from "../../../models/protocols";
import { httpRequest, httpRespose } from "../../protocols";

export interface IGetUserController {
    handle({ params }: httpRequest<string>): Promise<httpRespose<User>>
}

export interface IGetUserRepository {
    getUsers(params: string): Promise<User>
}
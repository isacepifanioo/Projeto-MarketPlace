import { User } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IGetUsersController {
    handle(): Promise<httpRespose<User[]>>
}

export interface IGetUsersRepository {
    getUsers(): Promise<User[]>
}

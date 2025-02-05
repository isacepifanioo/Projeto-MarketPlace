import { User } from "../../../models/protocols";
import { httpRequest, httpRespose } from "../../protocols";

export interface IDeleteUserController {
    handle({ params }: httpRequest<string>): Promise<httpRespose<User>>
}

export interface IDeleteUserRepository {
    deleteUSer(id: string): Promise<User>
}
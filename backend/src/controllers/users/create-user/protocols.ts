import { User } from "../../../models/protocols";
import { httpRequest, httpRespose } from "../../protocols";

export interface ICreateUserController {
  handle({ body }: httpRequest<CreateUserParams>): Promise<httpRespose<User>>;
}

export interface IcreateUserRepository {
  createUser({ body }: httpRequest<CreateUserParams>): Promise<User>;
}

export interface CreateUserParams {
  img: string;
  name: string;
  lastname: string;
  birth_date: string;
  email: string;
  password: string;
  confirmPassword: string;
}

import { User } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IGetUsersController, IGetUsersRepository } from "./protocols";
export class GetUsersController implements IGetUsersController {
  constructor(private readonly getUsersRepository: IGetUsersRepository) {}

  async handle(): Promise<httpRespose<User[]>> {
    try {
      const users = await this.getUsersRepository.getUsers()
      return {
        StatusCode: 200,
        Body: users
      }
    } catch (error) {
      console.log(error);
      return {
        StatusCode: 500,
        Body: "Somenthing went wrong",
      };
    }
  }
}

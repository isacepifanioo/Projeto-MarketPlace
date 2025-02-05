import { User } from "../../../models/protocols";
import { httpRequest, httpRespose } from "../../protocols";
import { IGetUserController, IGetUserRepository } from "./protocols";

export class GetUserController implements IGetUserController {
  constructor(private readonly GetUserRepository: IGetUserRepository) {}
  async handle({ params }: httpRequest<string>): Promise<httpRespose<User>> {
    try {
      const id = params;
      if (!id) {
        return {
          StatusCode: 400,
          Body: "O campo id esta vazio",
        };
      }

      const User = await this.GetUserRepository.getUsers(id);

      if (!User) {
        return {
          StatusCode: 404,
          Body: "Usuário não encontrado",
        };
      }

      return {
        StatusCode: 200,
        Body: User,
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return {
        StatusCode: 500,
        Body: "Somenthing went wrong",
      };
    }
  }
}

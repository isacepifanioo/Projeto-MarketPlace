import { getToken } from "../../../helper/get-token";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";
import { httpRequest, httpRespose } from "../../protocols";
import { IDeleteUserController, IDeleteUserRepository } from "./protocols";
import jwt from 'jsonwebtoken'

export class DeleteUserController implements IDeleteUserController {
  constructor(private readonly deleteUserRepository: IDeleteUserRepository) {}
  async handle({ params, req }: httpRequest<string>): Promise<httpRespose<User>> {
    try {
        const id = params
      if (!id) {
        return {
          StatusCode: 400,
          Body: "Não foi possivel delete sua conta, Tente Novamente",
        };
      }

      const UserExist = await Users.findOne({ _id: id });

      if (!UserExist) {
        return {
          StatusCode: 400,
          Body: "Este usuário não existe",
        };
      }

      const token =  getToken(req!) as string

      const idAuthUser = jwt.verify(token, 'nossoSecret') as jwt.JwtPayload

      if(idAuthUser.id !== UserExist.id) {
        return {
          StatusCode: 409,
          Body: "Você não pode deleta outro perfil de usuario"
        }
      }

      const User = await this.deleteUserRepository.deleteUSer(id);
      if (!User) {
        return {
          StatusCode: 404,
          Body: "Não foi possivel encontrar este usuário",
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

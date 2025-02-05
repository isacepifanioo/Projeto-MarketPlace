import { getToken } from "../../../helper/get-token";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";
import { httpRequest, httpRespose } from "../../protocols";
import {
  IUpdateUserController,
  IUpdateUserRepository,
  UpdateUserParams,
} from "./protocols";
import bcrypt from "bcrypt";
import path from "path";

import jwt from "jsonwebtoken";

import fs from "fs";

export class UpdateUserController implements IUpdateUserController {
  constructor(private readonly UpdateUserRepository: IUpdateUserRepository) {}
  async handle({
    params,
    body,
    req,
  }: httpRequest<UpdateUserParams>): Promise<httpRespose<User>> {
    try {
      const id = params;

      const keyUser = [
        "img",
        "name",
        "lastname",
        "age",
        "password",
        "confirmPassword",
      ];

      if (!id) {
        return {
          StatusCode: 400,
          Body: "Usuario não encontrado",
        };
      }

      if (!body) {
        return {
          StatusCode: 400,
          Body: "Você não pode deixa os campos vazio",
        };
      }

      const UserFindDB = await Users.findOne({ _id: id }).lean();

      

      const token = getToken(req!) as string;

      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      if (tokenId.id !== UserFindDB?._id.toHexString()) {
        return {
          StatusCode: 400,
          Body: "Você não pode atualizar outro perfil de usuario",
        };
      }

      for (const key of keyUser) {
        if (!body?.[key as keyof UpdateUserParams]) {
          return {
            StatusCode: 400,
            Body: `O campo ${key} não pode esta vazio`,
          };
        }
      }

      for (const key in body) {
        if (key === "email" || key === "id") {
          return {
            StatusCode: 400,
            Body: `Você não pode altera o campo ${key}`,
          };
        }
      }

      const IsKeyValid = Object.keys(body).filter(
        (value) => !keyUser.includes(value)
      );

      if (IsKeyValid.length > 0) {
        return {
          StatusCode: 400,
          Body: `O campo ${IsKeyValid[0]} não existe`,
        };
      }

      if (body.password !== body.confirmPassword) {
        return {
          StatusCode: 400,
          Body: `A confirmação da senha não corresponde à senha informada.`,
        };
      }

      if (!body.img) {
        body.img = UserFindDB?.img as string;
      } else {
        fs.unlink(
          path.resolve(__dirname, "../../../", `${UserFindDB?.img}`),
          () => console.log("deleted")
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = body;
      const salt = bcrypt.genSaltSync(10);
      const newPassword = bcrypt.hashSync(body.password, salt);

      const newBody = {
        password: newPassword,
        ...rest,
      };


      const User = await this.UpdateUserRepository.updateUser(id, newBody);

      if (!User) {
        return {
          StatusCode: 404,
          Body: "Não foi possivel encontrar usuário",
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

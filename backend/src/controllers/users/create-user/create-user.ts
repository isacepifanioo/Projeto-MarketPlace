import { User } from "../../../models/protocols";
import { httpRequest, httpRespose } from "../../protocols";
import { isEmail } from "validator";
import {
  CreateUserParams,
  ICreateUserController,
  IcreateUserRepository,
} from "./protocols";
import { Users } from "../../../models/Users";
import bcrypt from "bcrypt";

import { createToken } from "../../../helper/create-token";

export class CreateUserController implements ICreateUserController {
  constructor(private readonly CreateUserRepository: IcreateUserRepository) {}
  async handle({
    body,
  }: httpRequest<CreateUserParams>): Promise<httpRespose<User>> {
    try {
      const User = body;
      const keyUser = [
        "img",
        "name",
        "lastname",
        "age",
        "email",
        "password",
        "confirmPassword",
      ];

      if (!User!.img) {
        return {
          StatusCode: 400,
          Body: `O campo img não pode esta vazio`,
        };
      }

      if (!User) {
        return {
          StatusCode: 400,
          Body: "Não e possivel cria usuario, Por favor Preencha os campos",
        };
      }
      for (const key of keyUser) {
        if (!User?.[key as keyof CreateUserParams]) {
          return {
            StatusCode: 400,
            Body: `O campo ${key} não pode esta vazio`,
          };
        }
      }

      if (User.password !== User.confirmPassword) {
        return {
          StatusCode: 400,
          Body: `A confirmação da senha não corresponde à senha informada.`,
        };
      }

      const isEmailValid = isEmail(User.email);

      if (!isEmailValid) {
        return {
          StatusCode: 400,
          Body: "E-mail inválido, Tente Novamente",
        };
      }

      const email = await Users.findOne({ email: User.email }).lean();
      if (email?.email.toLowerCase() === User.email.toLowerCase()) {
        return {
          StatusCode: 409,
          Body: "Este Usuario ja foi cadastrado",
        };
      }

      const salt = bcrypt.genSaltSync(10);
      const Newpassword = bcrypt.hashSync(User.password, salt);

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, img, ...rest } = User!;

      const newImg = img.replace("src\\uploads\\users\\", "uploads/users/");

      const newBody = {
        password: Newpassword,
        img: newImg,
        ...rest,
      };

      const user = await this.CreateUserRepository.createUser({
        body: newBody,
      });

      const token = createToken(user);

      return {
        StatusCode: 201,
        Body: user,
        token: token,
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

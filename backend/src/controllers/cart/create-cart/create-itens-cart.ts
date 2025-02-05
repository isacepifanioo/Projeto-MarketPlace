import { Products } from "../../../models/Products";
import { User } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import {
  ICreateItensCartController,
  ICreateItensCartRepository,
} from "./protocols";
import jwt from "jsonwebtoken";

export class CreateItensCartController implements ICreateItensCartController {
  constructor(private readonly createItensCart: ICreateItensCartRepository) {}
  async handle(id: string, token: string): Promise<httpRespose<User>> {
    try {
      if (!id) {
        return {
          StatusCode: 400,
          Body: "O produto não definido",
        };
      }

      const Product = await Products.findOne({ _id: id }).lean();

      if (!Product) {
        return {
          StatusCode: 404,
          Body: "Esse produto não existe",
        };
      }

      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      if (tokenId.id === Product!.userId) {
        return {
          StatusCode: 403,
          Body: "Você não pode adiciona seu produto no carrino",
        };
      }

      const User = await this.createItensCart.createItensCart(id, tokenId.id);

      if (!User) {
        return {
          StatusCode: 404,
          Body: "Não foi possivel encontrar a sua conta. Tente Novamente",
        };
      }

      return {
        StatusCode: 201,
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

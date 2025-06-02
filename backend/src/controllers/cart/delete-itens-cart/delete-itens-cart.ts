import { httpRespose } from "../../protocols";
import {
  IDeleteItensCartController,
  IDeleteItensCartRepository,
} from "./protocols";
import jwt from "jsonwebtoken";

export class DeleteItensCartController implements IDeleteItensCartController {
  constructor(
    private readonly deleteItensCartRepository: IDeleteItensCartRepository
  ) {}
  async handle(
    idProduct: string,
    token: string
  ): Promise<httpRespose<null>> {
    try {
      if (!idProduct) {
        return {
          StatusCode: 400,
          Body: "O produto não esta definido",
        };
      }
      const tokeId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      const myCard = await this.deleteItensCartRepository.deleteItensCart(
        idProduct,
        tokeId.id
      );

      if(myCard.length === 0) {
        return {
          StatusCode: 200,
          Body: null,
        };
      }

      return {
        StatusCode: 200,
        Body: null,
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

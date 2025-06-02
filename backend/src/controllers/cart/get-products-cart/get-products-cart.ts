import { MyCard } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IGetItensCartController, IGetItensCartRepository } from "./protocols";
import jwt from "jsonwebtoken";

export class GetItensCartController implements IGetItensCartController {
  constructor(
    private readonly getItensCartRepository: IGetItensCartRepository
  ) {}
  async handle(token: string): Promise<httpRespose<MyCard[]>> {
    try {
      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      const myCard = await this.getItensCartRepository.getItensCart(tokenId.id);

      if (myCard.length === 0) {
        return {
          StatusCode: 200,
          Body: [],
        };
      }

      return {
        StatusCode: 200,
        Body: myCard,
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

import { IAddress } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IGetAddressController, IGetAddressRepsitory } from "./protocols";
import jwt from "jsonwebtoken";

export class GetAddressController implements IGetAddressController {
  constructor(private readonly getAddressRepsitory: IGetAddressRepsitory) {}
  async handle(token: string): Promise<httpRespose<IAddress>> {
    try {
      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;
      const getAddress = await this.getAddressRepsitory.getAddress(tokenId.id);

      if (!getAddress) {
        return {
          StatusCode: 404,
          Body: "Nenhum endereço encontrado.",
        };
      }

      return {
        StatusCode: 200,
        Body: getAddress,
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

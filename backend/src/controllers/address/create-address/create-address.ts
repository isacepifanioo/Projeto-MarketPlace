import { Address } from "../../../models/Address";
import { IAddress } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import {
  ICreateAddressController,
  ICreateAddressRepository,
  IReqBodyAddress,
} from "./protocols";
import jwt from "jsonwebtoken";

export class CreateAddressController implements ICreateAddressController {
  constructor(
    private readonly createAddressRepository: ICreateAddressRepository
  ) {}
  async handle(
    address: IReqBodyAddress,
    token: string
  ): Promise<httpRespose<IAddress>> {
    try {
      const KeyAddress = [
        "street",
        "number",
        "complement",
        "neighborhood",
        "city",
        "portalCode",
      ];

      for (const key of KeyAddress) {
        if (!address?.[key as keyof IReqBodyAddress]) {
          return {
            StatusCode: 400,
            Body: `O campo ${key} não pode está vazio`,
          };
        }
      }
      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      const existAddress = await Address.findOne({ userId: tokenId.id }).lean();

      if (existAddress) {
        return {
          StatusCode: 422,
          Body: "Você não poder cria mais de um Endereço",
        };
      }

      const newAddress = {
        ...address,
        userId: tokenId.id,
      };
      
      const AddressUser = await this.createAddressRepository.createAddress(
        newAddress
      );

      return {
        StatusCode: 201,
        Body: AddressUser,
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

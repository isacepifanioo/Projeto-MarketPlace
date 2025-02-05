import jwt from "jsonwebtoken";
import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import {
  ICreateProductsController,
  ICreateProductsParams,
  IMongoCreateProductsParams,
  ICreateProductsRepository,
} from "./protocols";



export class CreateProductsController implements ICreateProductsController {
  constructor(
    private readonly createProductsRepository: ICreateProductsRepository
  ) {}
  async handle(
    productsParms: ICreateProductsParams,
    token: string
  ): Promise<httpRespose<IProducts>> {
    try {
      const keyProducts = ["img", "name", "price", "description"];

      for (const key of keyProducts) {

        if (!productsParms?.[key as keyof ICreateProductsParams]) {
          return {
            StatusCode: 400,
            Body: `O campo ${key} não pode esta vazio`,
          };
        }
      }

      const existNewKey = Object.keys(productsParms).filter(
        (prevent) => !keyProducts.includes(prevent)
      );

      if (existNewKey.length > 0) {
        return {
          StatusCode: 400,
          Body: `O campo ${existNewKey[0]} não existe`,
        };
      }

      if (productsParms?.img.length === 0) {
        return {
          StatusCode: 400,
          Body: "Você precisa adiciona pelo menos uma imagem",
        };
      }

      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      const userId = tokenId.id;

      const newProducts: IMongoCreateProductsParams = {
        ...productsParms,
        userId: userId,
      };

      const Products = await this.createProductsRepository.createProducts(
        newProducts
      );

      if (!Products) {
        return {
          StatusCode: 400,
          Body: "Não foi possivel criar seu produto, tente novamente",
        };
      }

      return {
        StatusCode: 201,
        Body: Products,
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

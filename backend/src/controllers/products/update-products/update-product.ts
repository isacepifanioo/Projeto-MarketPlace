import { Products } from "../../../models/Products";
import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { ICreateProductsParams } from "../create-products/protocols";
import {
  IUpdateProductsController,
  IUpdateProductsRepository,
} from "./protocols";

import jwt from "jsonwebtoken";

import path from "path";
import fs from "fs";

export class UpdateProductsController implements IUpdateProductsController {
  constructor(
    private readonly updateProductsRepository: IUpdateProductsRepository
  ) {}
  async handle(
    createProductsParams: ICreateProductsParams,
    id: string,
    token: string
  ): Promise<httpRespose<IProducts>> {
    try {
      const productFind = await Products.findOne({ _id: id }).lean();
      console.log("productFind: ", productFind);

      if (!productFind) {
        return {
          StatusCode: 400,
          Body: `Este produto não existe`,
        };
      }

      if (!createProductsParams.img || !(createProductsParams.img.length > 0)) {
        createProductsParams.img = productFind.img;
      } else {
        for (const imgs of productFind.img) {
          fs.unlink(path.resolve(__dirname, "../../../", `${imgs}`), () =>
            console.log("deleted")
          );
        }
      }

      const keyProducts = ["img", "name", "price", "description"];
      for (const key of keyProducts) {
        if (!createProductsParams?.[key as keyof ICreateProductsParams]) {
          return {
            StatusCode: 400,
            Body: `O campo ${key} não pode esta vazia`,
          };
        }
      }

      const isNewKey = Object.keys(createProductsParams).filter(
        (prevent) => !keyProducts.includes(prevent)
      );

      if (isNewKey.length > 0) {
        return {
          StatusCode: 400,
          Body: `O campo ${isNewKey[0]} não existe`,
        };
      }

      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      if (tokenId.id !== productFind.userId) {
        return {
          StatusCode: 403,
          Body: `Você não pode edita produto de outro usuário`,
        };
      }

      const product = await this.updateProductsRepository.updateProducts(
        createProductsParams,
        id
      );

      if (!product) {
        return {
          StatusCode: 404,
          Body: "Não foi possivel encontrar atualizar este usuario, tente novamente",
        };
      }

      return {
        StatusCode: 200,
        Body: product,
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

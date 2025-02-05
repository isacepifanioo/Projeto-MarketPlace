import { Products } from "../../../models/Products";
import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import {
  IDeleteProductsController,
  IDeleteProductsRepository,
} from "./protocols";
import jwt from 'jsonwebtoken'

export class DeleteProductsController implements IDeleteProductsController {
  constructor(
    private readonly deleteProductsRepository: IDeleteProductsRepository
  ) {}
  async handle(id: string, token: string): Promise<httpRespose<IProducts>> {
    try {
      if (!id) {
        return {
          StatusCode: 400,
          Body: "Você precisa adiciona o id do Produto",
        };
      }

      const myProducts = await Products.findOne({ _id: id }).lean();
      if(!myProducts) {
        return {
            StatusCode: 400,
            Body: 'Este Produto não existe'
        }
      }

      const tokenId = jwt.verify(token, 'nossoSecret') as jwt.JwtPayload

      if(myProducts?.userId !== tokenId.id) {
        return {
            StatusCode: 400,
            Body: "Você não pode deleta um produto de outro usuário"
        }
      }
      const product = await this.deleteProductsRepository.deleteUser(id);

      if (!product) {
        return {
          StatusCode: 400,
          Body: "O Produto não existe",
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

import { IProducts } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IGetProductsController, IGetProductsRepository } from "./protocols";

export class GetProductsController implements IGetProductsController {
  constructor(private readonly IGetPoductsRepository: IGetProductsRepository) {}
  async handle(): Promise<httpRespose<IProducts[]>> {
    try {
      const products = await this.IGetPoductsRepository.getProducts();
      if (!products || products.length === 0) {
        return {
          StatusCode: 400,
          Body: "Não existe nenhum Produto cadastrado",
        };
      }

      return {
        StatusCode: 200,
        Body: products,
      };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            StatusCode: 500,
            Body: "Somenthing went wrong"
        }
    }
  }
}

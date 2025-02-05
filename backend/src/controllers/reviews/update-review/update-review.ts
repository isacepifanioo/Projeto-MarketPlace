import { Products } from "../../../models/Products";
import { IReviews, IPerfilWithReviews } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IUpdateReviewController, IUpdateReviewReporsitory } from "./protocols";
import jwt from "jsonwebtoken";

export class UpdateReviewController implements IUpdateReviewController {
  constructor(
    private readonly updateReviewReporsitory: IUpdateReviewReporsitory
  ) {}
  async handle(
    idProduct: string,
    token: string,
    bodyUpdate: IReviews
  ): Promise<httpRespose<IPerfilWithReviews>> {
    try {
      if (!idProduct) {
        return {
          StatusCode: 400,
          Body: "Você precisa adiciona o id do produto",
        };
      }
      if (!(bodyUpdate.stars > 0) || !(bodyUpdate.stars <= 5)) {
        return {
          StatusCode: 400,
          Body: "Você pode dar de 1 a 5 estrelas.",
        };
      }

      const Product = await Products.findOne({ _id: idProduct }).lean();

      if (!Product) {
        return {
          StatusCode: 400,
          Body: "Esse produto não existe",
        };
      }

      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      const existReview = Product!.reviews.find(
        (review) => review.userId === tokenId.id
      );

      if (!existReview) {
        return {
          StatusCode: 404,
          Body: "A sua avaliação não foi encontranda",
        };
      }

      const PerfilWithReview = await this.updateReviewReporsitory.updateReview(
        idProduct,
        tokenId.id,
        bodyUpdate
      );

      if (!PerfilWithReview) {
        return {
          StatusCode: 404,
          Body: "a sua avaliação não foi enontrada, recarrege a pagina ou tente novamente",
        };
      }

      return {
        StatusCode: 200,
        Body: PerfilWithReview,
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

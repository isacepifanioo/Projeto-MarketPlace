import { Products } from "../../../models/Products";
import { IPerfilWithReviews } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import { IDeleteReviewController, IDeleteReviewRepository } from "./protocols";
import jwt from "jsonwebtoken";

export class DeleteReviewController implements IDeleteReviewController {
  constructor(
    private readonly deleteReviewRepository: IDeleteReviewRepository
  ) {}
  async handle(
    idProduct: string,
    token: string
  ): Promise<httpRespose<IPerfilWithReviews>> {
    try {
      const Product = await Products.findOne({ _id: idProduct }).lean();

      if (!Product) {
        return {
          StatusCode: 404,
          Body: "O produto não foi encontrado",
        };
      }

      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      const existReview = Product.reviews.find(
        (review) => review.userId === tokenId.id
      );

      if (!existReview) {
        return {
          StatusCode: 404,
          Body: "Não foi possivel encontrar o sua Avaliação",
        };
      }

      const review = await this.deleteReviewRepository.deleteReview(
        idProduct,
        tokenId.id
      );

      if (!review) {
        return {
          StatusCode: 404,
          Body: "Não foi possivel encontrar o sua Avaliação",
        };
      }

      return {
        StatusCode: 200,
        Body: review,
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

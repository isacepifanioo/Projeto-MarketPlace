import jwt from "jsonwebtoken";
import { IReviews, IPerfilWithReviews } from "../../../models/protocols";
import { httpRespose } from "../../protocols";
import {
  ICreateReviewsController,
  ICreateReviewsRepository,
} from "./protocols";
import { Products } from "../../../models/Products";
import fs from 'fs'
import path from 'path'
import { Users } from "../../../models/Users";

export class CreateReviewsController implements ICreateReviewsController {
  constructor(
    private readonly createReviewsRepository: ICreateReviewsRepository
  ) {}
  async handle(
    idProduct: string,
    token: string,
    reviews: IReviews
  ): Promise<httpRespose<IPerfilWithReviews>> {
    try {
      const keyReview = ["stars", "comment", "reviewFile"];

      const isNewKey = Object.keys(reviews).filter(
        (key) => !keyReview.includes(key)
      );
      const review = reviews.reviewFile
      if (isNewKey.length > 0) {
        review?.map(file => {
          fs.unlink(path.resolve(__dirname, "../../../", `${file}`), () => console.log('deleted'))
        })
        return {
          StatusCode: 400,
          Body: `O campo ${isNewKey[0]} não existe`,
        };
      }

      if (!reviews.stars) {
        review?.map(file => {
          fs.unlink(path.resolve(__dirname, "../../../", `${file}`), () => console.log('deleted'))
        })
        return {
          StatusCode: 400,
          Body: "Você precisa adiciona pelo menos uma estrela"
        };
      }

      if (!(reviews.stars > 0) || !(reviews.stars <= 5)) {
        review?.map(file => {
          fs.unlink(path.resolve(__dirname, "../../../", `${file}`), () => console.log('deleted'))
        })
        return {
          StatusCode: 400,
          Body: "Você pode dar de 1 a 5 estrelas.",
        };
      }

      const tokenId = jwt.verify(token, "nossoSecret") as jwt.JwtPayload;

      const Product = await Products.findOne({ _id: idProduct }).lean();

      const UserFind = await Users.findOne({_id: tokenId.id}).lean()

      const searchPurchaseProduct = UserFind!.purchaseHistory.find(product => product.productId === idProduct)

      if(!searchPurchaseProduct) {
        return {
          StatusCode: 403,
          Body: "Você não pode avaliar produto que você não comprou"
        }
      }
      
      const commentProduct: IPerfilWithReviews = Product?.reviews.find(
        (product) => product.userId === tokenId.id
      ) ?? [];

      if (tokenId.id === commentProduct.userId) {
        review?.map(file => {
          fs.unlink(path.resolve(__dirname, "../../../", `${file}`), () => console.log('deleted'))
        })
        return {
          StatusCode: 409,
          Body: "Você não pode cria dois cometarios",
        };
      }

      const perfilWithReview = await this.createReviewsRepository.createReviews(
        idProduct,
        tokenId.id,
        reviews
      );

      if (!perfilWithReview) {
        review?.map(file => {
          fs.unlink(path.resolve(__dirname, "../../../", `${file}`), () => console.log('deleted'))
        })
        return {
          StatusCode: 404,
          Body: "Não encontramos o seu comentário",
        };
      }

      return {
        StatusCode: 200,
        Body: perfilWithReview,
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

import { IPerfilWithReviews, IReviews } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface ICreateReviewsController {
    handle(idProduct: string, token: string, reviews: IReviews): Promise<httpRespose<IPerfilWithReviews>>
}

export interface ICreateReviewsRepository {
    createReviews(idProduct: string, tokenId: string, reviews: IReviews): Promise<IPerfilWithReviews>
}
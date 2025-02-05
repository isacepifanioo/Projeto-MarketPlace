import { IPerfilWithReviews } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IDeleteReviewController {
    handle(idProduct: string, token: string): Promise<httpRespose<IPerfilWithReviews>>
}

export interface IDeleteReviewRepository {
    deleteReview(idProduct: string, tokenId: string): Promise<IPerfilWithReviews | undefined>
}
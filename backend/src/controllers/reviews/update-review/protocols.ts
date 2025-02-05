import { IPerfilWithReviews, IReviews } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IUpdateReviewController {
    handle(idProduct: string, token: string, bodyUpdate: IReviews): Promise<httpRespose<IPerfilWithReviews>>
}


export interface IUpdateReviewReporsitory {
    updateReview(idProduct: string, tokenId: string, bodyUpdate: IReviews): Promise<IPerfilWithReviews>
}
import { IUpdateReviewReporsitory } from "../../../controllers/reviews/update-review/protocols";
import { Products } from "../../../models/Products";
import { IReviews, IPerfilWithReviews } from "../../../models/protocols";
import fs from "fs";
import path from "path";

export class MongoUpdateReviewRepository implements IUpdateReviewReporsitory {
  async updateReview(
    idProduct: string,
    tokenId: string,
    bodyUpdate: IReviews
  ): Promise<IPerfilWithReviews> {
    const Product = await Products.findOne({ _id: idProduct }).lean();

    const PerfilWithReview = Product!.reviews.find(
      (review) => review.userId === tokenId
    ) as IPerfilWithReviews;

    const reviewDeleted = PerfilWithReview.review.reviewFile?.filter(img => !bodyUpdate.reviewFile?.includes(img)) 

    if (reviewDeleted) {
      reviewDeleted.map((img) =>
        fs.unlink(path.resolve(__dirname, "../../../", `${img}`), () =>
          console.log("deleted")
        )
      );
    }

    const newPerfilWithReview = {
      ...PerfilWithReview,
      review: bodyUpdate,
    };

    const newReviewProduct = Product!.reviews.map((review) =>
      review.userId === tokenId ? newPerfilWithReview : review
    );

    const newProduct = {
      ...Product!,
      reviews: newReviewProduct,
    };

    await Products.updateOne({_id: idProduct}, {$set: newProduct})
    const ProductUpdate = await Products.findOne({ _id: idProduct }).lean();

    const PerfilWithReviewUpdate = ProductUpdate!.reviews.find(
      (review) => review.userId === tokenId
    ) as IPerfilWithReviews;

    return PerfilWithReviewUpdate
  }
}

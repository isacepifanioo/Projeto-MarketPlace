import { IDeleteReviewRepository } from "../../../controllers/reviews/delete-review/protocols";
import { Products } from "../../../models/Products";
import { IPerfilWithReviews } from "../../../models/protocols";

export class MongodeleteReviewRepository implements IDeleteReviewRepository {
    async deleteReview(idProduct: string, tokenId: string): Promise<IPerfilWithReviews | undefined> {
        
        const Product = await Products.findOne({_id: idProduct}).lean()

        if(!Product) {
            throw new Error('product not found')
        }

        const newReview: IPerfilWithReviews[] = Product?.reviews.filter(
            (review) => review.userId !== tokenId
          );

          const qtyStarsUpdate = newReview.reduce((ac, perfilWithReviews) => {
            const Stars = Number(perfilWithReviews.review.stars)
            return ac + Stars
          }, 0)

          const newProduct = {
            ...Product!,
            qtyStars: qtyStarsUpdate,
            reviews: newReview
          }
         
          const {modifiedCount} = await Products.updateOne({_id: idProduct}, {$set: newProduct})

          let getReviewDelete;

          if(modifiedCount > 0) {

            getReviewDelete = Product?.reviews.find(
              (review) => review.userId === tokenId
            ) as IPerfilWithReviews

          }
        
          return getReviewDelete 
    }
}
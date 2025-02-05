import { ICreateReviewsRepository } from "../../../controllers/reviews/create-review/protocols";
import { Products } from "../../../models/Products";
import { IReviews, IPerfilWithReviews } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoCreateReviewsRepository implements ICreateReviewsRepository {
    async createReviews(idProduct: string, tokenId: string, reviews: IReviews): Promise<IPerfilWithReviews> {
        
        const User = await Users.findOne({_id: tokenId}).lean()

        const Product = await Products.findOne({_id: idProduct}).lean()

        const { _id, img,  name, lastname, } = User!

        const data = new Date()

        const newReviews: IPerfilWithReviews = {
            userId: _id.toHexString(),
            perfilImg: img,
            name: name,
            lastname: lastname,
            date: data.getDate() + '/' + data.getMonth() + 1 + '/' + data.getFullYear(),
            review: {
                ...reviews
            }
        }

        const copyReviews = Product!.reviews ?? []

        let newReviewsProduct: IPerfilWithReviews[] = []

        if(copyReviews.length === 0) {
            newReviewsProduct.push(newReviews)
        } else {
            newReviewsProduct = [...Product!.reviews, newReviews]
        }

        const Stars = newReviewsProduct.reduce((ac, perfilWhiteProduct) => {
            const userRatingStars = Number(perfilWhiteProduct.review.stars)
            return ac + userRatingStars
        }, 0) 

        const newProduct = {
            ...Product!,
            qtyStars: Stars,
            reviews: newReviewsProduct
        }

        await Products.updateOne({_id: idProduct}, {$set: newProduct})

        const ProductUpdate = await Products.findOne({_id: idProduct}).lean()

        const newProductReviews: IPerfilWithReviews = ProductUpdate!.reviews.find(product => product.userId === tokenId) ?? []

        return newProductReviews
    }
}
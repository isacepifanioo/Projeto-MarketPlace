import mongoose, { Schema } from "mongoose";

export const Products = mongoose.model(
  "Products",
  new Schema({
    img: { type: Array, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    qtyPurchase: { type: Number, default: 0 },
    qtyStars: { type: Number, default: 0 },
    reviews: { type: Array },
  })
);

import mongoose, { Schema } from "mongoose";

export const Users = mongoose.model(
  "User",
  new Schema({
    img: { type: String, required: true },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    birth_date: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    purchaseHistory: {type: Array, default: []},
    CartItens: {type: Array},
  }
)
);

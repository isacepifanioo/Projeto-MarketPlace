import mongoose, { Schema } from "mongoose";

export const Address = mongoose.model(
  "Address",
  new Schema({
    userId: { type: String, required: true },
    street: { type: String, required: true },
    number: { type: String, required: true },
    complement: { type: String, required: true },
    neighborhood: { type: String, required: true },
    city: { type: String, required: true },
    portalCode: { type: String, required: true },
  })
);

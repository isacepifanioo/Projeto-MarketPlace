import express from "express";
import { config } from "dotenv";
import { MongoClient } from "./database/conn";
import cors from "cors";
import { router as UserRouter } from "./router/users/router";
import { router as ProductsRouter } from "./router/products/router";
import { router as PurchaseRouter } from "./router/purchase/router";
import { router as CartRouter } from "./router/cart/router";
import { router as ReviewsRouter } from "./router/reviews/router";
import { router as AddressRouter } from "./router/address/router";
import path from "path";
const main = async () => {
  config();
  const app = express();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.use(
    "/uploads/users",
    express.static(`${path.join(__dirname)}/uploads/users`)
  );

  app.use(
    "/uploads/products",
    express.static(`${path.join(__dirname)}/uploads/products`)
  );
  app.use(
    "/uploads/reviews",
    express.static(`${path.join(__dirname)}/uploads/reviews`)
  );

  const allowedOrigin = "http://localhost:5173";
  app.use(cors({ origin: allowedOrigin }));

  const mongoClient = new MongoClient();
  await mongoClient.connect();

  app.use("/users", UserRouter);
  app.use("/products", ProductsRouter);
  app.use("/purchase", PurchaseRouter);
  app.use("/cart", CartRouter);
  app.use("/review", ReviewsRouter);
  app.use("/address", AddressRouter);

  const port = process.env.PORT || 3000;
  app.listen(port);
};

main();

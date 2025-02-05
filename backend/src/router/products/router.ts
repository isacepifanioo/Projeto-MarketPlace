import { Router } from "express";
import { isVerifyToken } from "../../middleware/isVerifyToken";
import { validToken } from "../../middleware/validToken";

import { ProductsUploads } from "../../utils/multer";
import {
  CreateProducts,
  DeleteProduct,
  GetProduct,
  GetProducts,
  GetProductUser,
  UpdateProduct,
} from "../../handlers/Products.handlers";

const router = Router();

router.get("/", GetProducts);

router.get("/myProduct", isVerifyToken, validToken, GetProductUser);

router.post(
  "/create",
  isVerifyToken,
  validToken,
  ProductsUploads.array("img", 10),
  CreateProducts
);

router.delete("/delete/:id", isVerifyToken, validToken, DeleteProduct);

router.patch(
  "/update/:id",
  isVerifyToken,
  validToken,
  ProductsUploads.array("img", 10),
  UpdateProduct
);

router.get("/:id", GetProduct);

export { router };

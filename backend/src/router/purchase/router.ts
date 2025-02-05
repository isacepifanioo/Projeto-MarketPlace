import { Router } from "express";
import { isVerifyToken } from "../../middleware/isVerifyToken";
import { validToken } from "../../middleware/validToken";
import {
  CreatePurchase,
  GetPurchaseProduct,
  GetPurchaseProducts,
} from "../../handlers/Purchase.handlers";

const router = Router();

router.post("/create/:id", isVerifyToken, validToken, CreatePurchase);

router.get("/", isVerifyToken, validToken, GetPurchaseProducts);

router.get("/:id", isVerifyToken, validToken, GetPurchaseProduct);

export { router };

import { Router } from "express";
import { isVerifyToken } from "../../middleware/isVerifyToken";
import { validToken } from "../../middleware/validToken";
import {
  CreateItensCart,
  DeleteItensCart,
  GetItensCart,
} from "../../handlers/Cart.handlers";

const router = Router();

router.delete("/:id", isVerifyToken, validToken, DeleteItensCart);

router.post("/:id", isVerifyToken, validToken, CreateItensCart);

router.get("/", isVerifyToken, validToken, GetItensCart);

export { router };

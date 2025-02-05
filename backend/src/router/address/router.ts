import { Router } from "express";
import { isVerifyToken } from "../../middleware/isVerifyToken";
import { validToken } from "../../middleware/validToken";
import {
  CreateAddress,
  DeleteAddress,
  GetAddress,
  UpdateAddress,
} from "../../handlers/Address.handlers";

const router = Router();

router.get("/", isVerifyToken, validToken, GetAddress);

router.post("/create", isVerifyToken, validToken, CreateAddress);

router.delete("/delete", isVerifyToken, validToken, DeleteAddress);

router.patch("/update", isVerifyToken, validToken, UpdateAddress);

export { router };

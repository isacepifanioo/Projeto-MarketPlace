import { Router } from "express";
import { UserUploads } from "../../utils/multer";
import { isVerifyToken } from "../../middleware/isVerifyToken";
import { validToken } from "../../middleware/validToken";

import {
  GetUsers,
  CreateUser,
  LoginUser,
  DeleteUser,
  UpdateUser,
  GetUser,
} from "../../handlers/User.handlers";

const router = Router();

router.get("/", GetUsers);
router.post("/create", UserUploads.single("img"), CreateUser);
router.post("/login", LoginUser);
router.delete("/delete/:id", isVerifyToken, validToken, DeleteUser);
router.patch(
  "/update/:id",
  isVerifyToken,
  validToken,
  UserUploads.single("img"),
  UpdateUser
);
router.get("/:id", GetUser);

export { router };

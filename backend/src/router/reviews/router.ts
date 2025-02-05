import { Router } from "express";
import { isVerifyToken } from "../../middleware/isVerifyToken";
import { ReviewsUploads } from "../../utils/multer";
import { validToken } from "../../middleware/validToken";
import {
  CreateReview,
  RemoveReviews,
  UpdateReview,
} from "../../handlers/Reviews.handlers";

const router = Router();

router.patch(
  "/:id",
  isVerifyToken,
  validToken,
  ReviewsUploads.array("reviewFile", 10),
  UpdateReview
);
router.post(
  "/:id",
  isVerifyToken,
  validToken,
  ReviewsUploads.array("reviewFile", 10),
  CreateReview
);
router.delete("/:id", isVerifyToken, validToken, RemoveReviews);

export { router };

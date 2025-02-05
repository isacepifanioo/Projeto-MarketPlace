import { Request, Response } from "express";
import { MongoCreateReviewsRepository } from "../repository/reviews/create-review/createReviews";
import { CreateReviewsController } from "../controllers/reviews/create-review/create-review";
import { IReviews } from "../models/protocols";
import { getToken } from "../helper/get-token";
import { MongoUpdateReviewRepository } from "../repository/reviews/update-review/update-review";
import { UpdateReviewController } from "../controllers/reviews/update-review/update-review";
import { MongodeleteReviewRepository } from "../repository/reviews/delete-review/delete-review";
import { DeleteReviewController } from "../controllers/reviews/delete-review/delete-review";
import { deleteImagens } from "../helper/delete-Imagens";

export async function CreateReview(req: Request, res: Response) {
  const mongoCreateReviewsRepository = new MongoCreateReviewsRepository();

  const createReviewsController = new CreateReviewsController(
    mongoCreateReviewsRepository
  );

  const files = req.files as Express.Multer.File[];
  let newReview = {} as IReviews;
  if (files) {
    const imgPaths = files.map((file) =>
      `${file.destination}/${file.filename}`.replace("src/", "")
    );
    newReview = {
      ...req.body,
      reviewFile: imgPaths,
    };
  } else {
    newReview = {
      ...req.body,
    };
  }

  const token = getToken(req) as string;

  const { Body, StatusCode } = await createReviewsController.handle(
    req.params.id,
    token,
    newReview
  );

  if (StatusCode !== 200 && Array.isArray(newReview.reviewFile)) {
    deleteImagens(newReview.reviewFile);
  }

  res.status(StatusCode).json(Body);
}

export async function UpdateReview(req: Request, res: Response) {
  const mongoUpdateReviewRepository = new MongoUpdateReviewRepository();

  const updateReviewController = new UpdateReviewController(
    mongoUpdateReviewRepository
  );

  const token = getToken(req) as string;

  const files = req.files as Express.Multer.File[];
  let newReview = {
    ...req.body,
  };
  if (files) {
    const imgPaths = files.map((file) =>
      `${file.destination}/${file.filename}`.replace("src/", "")
    );
    newReview = {
      ...req.body,
      reviewFile: imgPaths,
    };
  }

  const { StatusCode, Body } = await updateReviewController.handle(
    req.params.id,
    token,
    newReview
  );

  res.status(StatusCode).json(Body);
}

export async function RemoveReviews(req: Request, res: Response) {
  const mongodeleteReviewRepository = new MongodeleteReviewRepository();

  const deleteReviewController = new DeleteReviewController(
    mongodeleteReviewRepository
  );

  const token = getToken(req) as string;

  const { Body, StatusCode } = await deleteReviewController.handle(
    req.params.id,
    token
  );

  if (
    StatusCode === 200 &&
    typeof Body === "object" &&
    Array.isArray(Body.review.reviewFile)
  ) {
    deleteImagens(Body.review.reviewFile);
  }

  res.status(StatusCode).json(Body);
}

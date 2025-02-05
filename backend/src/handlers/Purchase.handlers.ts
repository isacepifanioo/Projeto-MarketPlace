import { Request, Response } from "express";
import { MongoCreatePurchaseProducts } from "../repository/purchase/create-purchase-product/create-purchase-product";
import { CreatePurchaseProductController } from "../controllers/purchase/create-purchase-product/create-purchase-product";
import { getToken } from "../helper/get-token";
import { MongoGetPurchaseProductsRepository } from "../repository/purchase/get-purchase-products/get-purchase-products";
import { GetPruchaseProductsController } from "../controllers/purchase/get-purchase-products/get-purchase-products";
import { MongoGetPurchaseProductRepository } from "../repository/purchase/get-purchase-product/get-purchase-product";
import { GetPurchaseProductController } from "../controllers/purchase/get-purchase-product/get-purchase-product";

export async function CreatePurchase(req: Request, res: Response) {
  const mongoCreatePurchaseProducts = new MongoCreatePurchaseProducts();

  const createPurchaseProductController = new CreatePurchaseProductController(
    mongoCreatePurchaseProducts
  );

  const token = getToken(req) as string;

  const { Body, StatusCode } = await createPurchaseProductController.handle(
    req.params.id,
    token
  );

  res.status(StatusCode).json(Body);
}

export async function GetPurchaseProducts(req: Request, res: Response) {
  const mongoGetPurchaseProductRepository =
    new MongoGetPurchaseProductsRepository();

  const getPurchaseProductsController = new GetPruchaseProductsController(
    mongoGetPurchaseProductRepository
  );

  const token = getToken(req) as string;

  const { Body, StatusCode } = await getPurchaseProductsController.handle(
    token
  );

  res.status(StatusCode).json(Body);
}

export async function GetPurchaseProduct(req: Request, res: Response) {
  const mongoGetPurchaseProductRepository =
    new MongoGetPurchaseProductRepository();

  const getPurchaseProductController = new GetPurchaseProductController(
    mongoGetPurchaseProductRepository
  );

  const token = getToken(req) as string;

  const { StatusCode, Body } = await getPurchaseProductController.handle(
    req.params.id,
    token
  );

  res.status(StatusCode).json(Body);
}

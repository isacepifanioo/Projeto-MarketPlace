import { Request, Response } from "express";
import { MongoDeleteItensCartRepository } from "../repository/cart/delete-itens-cart/delete-itens-cart";
import { DeleteItensCartController } from "../controllers/cart/delete-itens-cart/delete-itens-cart";
import { getToken } from "../helper/get-token";
import { MongoCreateItensCartRepository } from "../repository/cart/create-cart/create-itens-cart";
import { CreateItensCartController } from "../controllers/cart/create-cart/create-itens-cart";
import { MongoGetItensCartRepository } from "../repository/cart/get-products-cart/get-products-cart";
import { GetItensCartController } from "../controllers/cart/get-products-cart/get-products-cart";

export async function DeleteItensCart(req: Request, res: Response) {
  const mongoDeleteItensCartRepository = new MongoDeleteItensCartRepository();

  const deleteItensCartController = new DeleteItensCartController(
    mongoDeleteItensCartRepository
  );

  const token = getToken(req) as string;

  const { Body, StatusCode } = await deleteItensCartController.handle(
    req.params.id,
    token
  );

  res.status(StatusCode).json(Body);
}

export async function CreateItensCart(req: Request, res: Response) {
  const mongoCreateItensCartRepository = new MongoCreateItensCartRepository();

  const createItensCartController = new CreateItensCartController(
    mongoCreateItensCartRepository
  );

  const token = getToken(req) as string;

  const { StatusCode, Body } = await createItensCartController.handle(
    req.params.id,
    token
  );

  res.status(StatusCode).json(Body);
}

export async function GetItensCart(req: Request, res: Response) {
  const mongoGetItensCartRepository = new MongoGetItensCartRepository();

  const getItensCartController = new GetItensCartController(
    mongoGetItensCartRepository
  );

  const token = getToken(req) as string;

  const { StatusCode, Body } = await getItensCartController.handle(token);

  res.status(StatusCode).json(Body);
}

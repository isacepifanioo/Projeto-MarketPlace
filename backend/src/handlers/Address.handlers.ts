import { Request, Response } from "express";
import { MongoGetAddressRepsitory } from "../repository/address/get-address/get-address";
import { GetAddressController } from "../controllers/address/get-address/get-address";
import { getToken } from "../helper/get-token";
import { MongoCreateAddressRepository } from "../repository/address/create-address/create-address";
import { CreateAddressController } from "../controllers/address/create-address/create-address";
import { MongoDeleteAddressRepository } from "../repository/address/delete-address/delete-address";
import { DeleteAddressController } from "../controllers/address/delete-address/delete-address";
import { MongoUpdateAddressRepository } from "../repository/address/update-address/update-address";
import { UpdateAddressController } from "../controllers/address/update-address/update-address";

export async function GetAddress(req: Request, res: Response) {
  const mongoGetAddressRepsitory = new MongoGetAddressRepsitory();

  const getAddressController = new GetAddressController(
    mongoGetAddressRepsitory
  );

  const token = getToken(req) as string;

  const { StatusCode, Body } = await getAddressController.handle(token);

  res.status(StatusCode).json(Body);
}

export async function CreateAddress(req: Request, res: Response) {
  const mongoCreateAddressRepository = new MongoCreateAddressRepository();

  const token = getToken(req) as string;

  const createAddressController = new CreateAddressController(
    mongoCreateAddressRepository
  );

  const { StatusCode, Body } = await createAddressController.handle(
    req.body,
    token
  );

  res.status(StatusCode).json(Body);
}

export async function DeleteAddress(req: Request, res: Response) {
  const mongoDeleteAddressRepository = new MongoDeleteAddressRepository();

  const token = getToken(req) as string;

  const createAddressController = new DeleteAddressController(
    mongoDeleteAddressRepository
  );

  const { StatusCode, Body } = await createAddressController.handle(token);

  res.status(StatusCode).json(Body);
}

export async function UpdateAddress(req: Request, res: Response) {
  const mongoUpdateAddressRepository = new MongoUpdateAddressRepository();

  const updateAddressController = new UpdateAddressController(
    mongoUpdateAddressRepository
  );

  const token = getToken(req) as string;

  const { Body, StatusCode } = await updateAddressController.handle(
    req.body,
    token
  );

  res.status(StatusCode).json(Body);
}

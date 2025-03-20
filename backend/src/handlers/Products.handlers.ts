import { Request, Response } from "express";
import { MongoGetProductsRepository } from "../repository/products/get-products/get-products";
import { GetProductsController } from "../controllers/products/get-products/get-products";
import { MongoGetProductUserRepository } from "../repository/products/get-products-user/get-products-user";
import { GetProductUSerController } from "../controllers/products/get-products-user/get-products-user";
import { getToken } from "../helper/get-token";
import { MongoGetProductRepository } from "../repository/products/get-product/get.product";
import { GetProductController } from "../controllers/products/get-product/get-product";
import { MongoCreateProductsRepository } from "../repository/products/create-products/create-products";
import { CreateProductsController } from "../controllers/products/create-products/create-products";
import { MongoDeleteProductsRepository } from "../repository/products/delete-products/delete-products";
import { DeleteProductsController } from "../controllers/products/delete-products/delete-products";
import { MongoUpdateProductsRepository } from "../repository/products/update-products/update-products";
import { UpdateProductsController } from "../controllers/products/update-products/update-product";
import { deleteImagens } from "../helper/delete-Imagens";

export async function GetProducts(req: Request, res: Response) {
  const mongoGetProductsRepository = new MongoGetProductsRepository();

  const getproductsController = new GetProductsController(
    mongoGetProductsRepository
  );

  const { StatusCode, Body } = await getproductsController.handle();

  res.status(StatusCode).json(Body);
}

export async function GetProductUser(req: Request, res: Response) {
  const mongoGetProductUserRepository = new MongoGetProductUserRepository();

  const getProductUSerController = new GetProductUSerController(
    mongoGetProductUserRepository
  );

  const token = getToken(req) as string;

  const { Body, StatusCode } = await getProductUSerController.handle(token);

  res.status(StatusCode).json(Body);
}

export async function GetProduct(req: Request, res: Response) {
  const mongoGetProductRepository = new MongoGetProductRepository();

  const getProductController = new GetProductController(
    mongoGetProductRepository
  );

  const { Body, StatusCode } = await getProductController.handle(req.params.id);

  res.status(StatusCode).json(Body);
}

export async function CreateProducts(req: Request, res: Response) {
  const mongoCreateProductsRepository = new MongoCreateProductsRepository();

  const createProductsController = new CreateProductsController(
    mongoCreateProductsRepository
  );

  const token = getToken(req) as string;

  const files = req.files as Express.Multer.File[];

  let imgPaths;
 
  if(files) {
    imgPaths = files.map((file) =>
      `${file.destination}/${file.filename}`.replace("src/", "")
    );
  }

  const myProductsBody = {
    img: imgPaths,
    ...req.body,
  };

  const { StatusCode, Body } = await createProductsController.handle(
    myProductsBody,
    token
  );

  if (StatusCode !== 201) {
    deleteImagens(imgPaths!);
  }

  res.status(StatusCode).json(Body);
}

export async function DeleteProduct(req: Request, res: Response) {
  const mongoDeleteProductsRepository = new MongoDeleteProductsRepository();

  const deleteProductsController = new DeleteProductsController(
    mongoDeleteProductsRepository
  );

  const token = getToken(req) as string;
  const { Body, StatusCode } = await deleteProductsController.handle(
    req.params.id,
    token
  );

  if (StatusCode === 200 && typeof Body === "object") {
    deleteImagens(Body.img);
  }

  res.status(StatusCode).json(Body);
}

export async function UpdateProduct(req: Request, res: Response) {
  const mongoUpdateProductsRepository = new MongoUpdateProductsRepository();

  const updateProductsController = new UpdateProductsController(
    mongoUpdateProductsRepository
  );

  const file = req.files as Express.Multer.File[];

  let imgs;

  if (file.length > 0) {
    imgs = file.map((file) =>
      `${file.destination}/${file.filename}`.replace("src/", "")
    );
  } else {
    imgs = undefined;
  }

  const myUpdateProducts = {
    img: imgs,
    ...req.body,
  };

  const token = getToken(req) as string;

  const { StatusCode, Body } = await updateProductsController.handle(
    myUpdateProducts,
    req.params.id,
    token
  );

  if (StatusCode !== 200 && Array.isArray(imgs)) {
    deleteImagens(imgs);
  }

  res.status(StatusCode).json(Body);
}

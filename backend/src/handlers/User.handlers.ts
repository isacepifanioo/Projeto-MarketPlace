import { Request, Response } from "express";
import { GetUsersController } from "../controllers/users/get-users/get-users";
import { MongoGetUsersRepository } from "../repository/users/get-users/get-users";
import { MongoCreateUserRepository } from "../repository/users/create-user/create-user";
import { CreateUserController } from "../controllers/users/create-user/create-user";
import { MongoLoginUserRepository } from "../repository/users/login-user/login-user";
import { LoginUserController } from "../controllers/users/login-user/login-user";
import { MongoDeleteUserRepository } from "../repository/users/delete-user/delete-user";
import { DeleteUserController } from "../controllers/users/delete-user/delete-user";
import { MongoUpdateUserRepository } from "../repository/users/update-user/update-user";
import { UpdateUserController } from "../controllers/users/update-user/update-user";
import { MongoGetUserRepository } from "../repository/users/get-user/get-user";
import { GetUserController } from "../controllers/users/get-user/get-user";
import { deleteImagens } from "../helper/delete-Imagens";
import { UpdateUserParams } from "../controllers/users/update-user/protocols";

export async function GetUsers(req: Request, res: Response) {
  const mongoUserRepository = new MongoGetUsersRepository();

  const getUserController = new GetUsersController(mongoUserRepository);

  const { StatusCode, Body } = await getUserController.handle();

  res.status(StatusCode).json(Body);
}

export async function CreateUser(req: Request, res: Response) {
  const mongoUserCreateRepository = new MongoCreateUserRepository();

  const createUserController = new CreateUserController(
    mongoUserCreateRepository
  );

  const myBody = { img: req.file?.path, ...req.body };
  const { StatusCode, Body, token } = await createUserController.handle({
    body: myBody,
  });

  if (StatusCode !== 201) {
    deleteImagens(myBody.img);
  }

  res.status(StatusCode).json({ body: Body, token: token });
}
export async function LoginUser(req: Request, res: Response) {
  const mongoLoginUserRepository = new MongoLoginUserRepository();

  const loginUserController = new LoginUserController(mongoLoginUserRepository);

  const { Body, StatusCode, token } = await loginUserController.handle({
    email: req.body.email,
    password: req.body.password,
  });

  res.status(StatusCode).json({ body: Body, token: token });
}
export async function DeleteUser(req: Request, res: Response) {
  const mongoDeleteUserRepository = new MongoDeleteUserRepository();

  const deleteUserController = new DeleteUserController(
    mongoDeleteUserRepository
  );

  const { Body, StatusCode } = await deleteUserController.handle({
    params: req.params.id,
    req: req,
  });

  if (StatusCode === 200 && typeof Body === "object") {
    deleteImagens(Body.img);
  }

  res.status(StatusCode).json(Body);
}
export async function UpdateUser(req: Request, res: Response) {
  const myBody: UpdateUserParams = {
    img:
      req.file?.path.replace("src\\uploads\\users\\", "uploads/users/") ??
      undefined,
    ...req.body,
  };

  const mongoUpdateUserRepository = new MongoUpdateUserRepository();

  const updateUserRepository = new UpdateUserController(
    mongoUpdateUserRepository
  );

  const { StatusCode, Body } = await updateUserRepository.handle({
    params: req.params.id,
    body: myBody,
    req: req,
  });

  if (StatusCode !== 200 && myBody.img) {
    deleteImagens(myBody.img);
  }

  res.status(StatusCode).json(Body);
}
export async function GetUser(req: Request, res: Response) {
  const mongoUserCreateRepository = new MongoGetUserRepository();

  const getUserController = new GetUserController(mongoUserCreateRepository);

  const { StatusCode, Body } = await getUserController.handle({
    params: req.params.id,
  });

  res.status(StatusCode).json(Body);
}

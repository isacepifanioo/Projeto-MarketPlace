import { User } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface ICreateItensCartController {
  handle(id: string, token: string): Promise<httpRespose<User>>;
}

export interface ICreateItensCartRepository {
  createItensCart(Id: string, tokenId: string): Promise<User>;
}

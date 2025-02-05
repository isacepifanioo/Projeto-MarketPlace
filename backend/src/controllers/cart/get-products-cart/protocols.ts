import { MyCard } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IGetItensCartController {
  handle(token: string): Promise<httpRespose<MyCard[]>>;
}

export interface IGetItensCartRepository {
  getItensCart(tokenId: string): Promise<MyCard[]>;
}

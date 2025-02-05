import { MyCard } from "../../../models/protocols";
import { httpRespose } from "../../protocols";

export interface IDeleteItensCartController {
    handle(idProduct: string, token: string): Promise<httpRespose<MyCard[]>>
}

export interface IDeleteItensCartRepository {
    deleteItensCart(idProduct: string, tokenId: string): Promise<MyCard[]>
}


import { IGetItensCartRepository } from "../../../controllers/cart/get-products-cart/protocols";
import { MyCard } from "../../../models/protocols";
import { Users } from "../../../models/Users";

export class MongoGetItensCartRepository implements IGetItensCartRepository {
  async getItensCart(tokenId: string): Promise<MyCard[]> {
    const User = await Users.findOne({ _id: tokenId }).lean();

    const myCard: MyCard[] = User!.CartItens ?? [];

    return myCard;
  }
}

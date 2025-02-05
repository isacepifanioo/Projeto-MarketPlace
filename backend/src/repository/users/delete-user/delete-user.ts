import { IDeleteUserRepository } from "../../../controllers/users/delete-user/protocols";
import { Products } from "../../../models/Products";
import { User } from "../../../models/protocols";
import { Users } from "../../../models/Users";
import fs from 'fs'
import path from 'path'

export class MongoDeleteUserRepository implements IDeleteUserRepository {
  async deleteUSer(id: string): Promise<User> {
    if (!id) {
      throw new Error("O id não chegou no repository");
    }

    const User = await Users.findOne({ _id: id }).lean();

    if(!User) {
        throw new Error('usuário não existe')
    }

    const {deletedCount} = await Users.deleteOne({_id: id})

    if(!deletedCount) {
        throw new Error('usuario não deletado')
    }

    const ProductUSer = await Products!.find({userId: id}).lean()
    
    ProductUSer.map(product => {
    
      for(const file of product.img) {
        fs.unlink(path.resolve(__dirname, "../../../", file), () => console.log('deleted'))
      }
    
    })

    await Products.deleteMany({userId: id})

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _id, __v, ...rest } = User!;

    return { id: _id.toHexString(), ...rest };
  }
}

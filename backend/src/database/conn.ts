import mongoose, { Mongoose } from "mongoose";

export class MongoClient {
  client: undefined | Mongoose;
  async connect(): Promise<void> {
    try {
      const USER = process.env.DB_USER;
      const PASSWORD = process.env.DB_PASSWORD;

      const Client = await mongoose.connect(
        `mongodb+srv://${USER}:${PASSWORD}@cluster0.autu1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
      );

      this.client = Client;
      console.log("Conectado com mongo com sucesso");
    } catch (error) {
      console.log("deu erro no servidor: ", error);
    }
  }
}

import jwt from "jsonwebtoken";
import { User } from "../models/protocols";

export function createToken(User: User) {
  return jwt.sign(
    {
      id: User.id,
    },
    "nossoSecret"
  );
}

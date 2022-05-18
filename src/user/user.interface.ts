import { Types } from "mongoose";

export interface IUser {
  _id?: Types.ObjectId;
  userName: string;
  email: string;
  password: string;
  age: number;
  isAdmin?: Boolean;
}

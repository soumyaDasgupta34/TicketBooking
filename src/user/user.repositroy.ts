import { Schema, model } from "mongoose";
import { genSalt, hash } from "bcryptjs";
import { IUser } from "./user.interface";

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: [true, "User name must be provided"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email id must be provided"],
      unique: true,
      trim: true,
    },
    age: { type: Number, required: true },
    password: {
      type: String,
      required: [true, "Password must be provided"],
      trim: true,
    },
    isAdmin: { type: Boolean, default: false },
  },
  { collection: "user" }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});
export const saveUser = async (userData: IUser): Promise<IUser> =>
  UserModel.create(userData);

export const findByEmail = async (userEmail: string): Promise<IUser> =>
  UserModel.findOne({ email: userEmail });
const UserModel = model<IUser>("user", userSchema);

export default UserModel;

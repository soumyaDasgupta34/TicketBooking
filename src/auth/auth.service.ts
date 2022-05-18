import { compare } from "bcryptjs";
import { IUser } from "../user/user.interface";
import AppError from "../middlewares/errorHandlingMiddleware";
import generateAccessToken from "../utils/generateToken";

const matchPassword = async function (
  enteredPassword: string,
  savedPassword: string
): Promise<boolean> {
  return compare(enteredPassword, savedPassword);
};
export const registerUser =
  (userDb) =>
  async (userData: IUser): Promise<any> => {
    const { email } = userData;
    const userExists = await userDb.findByEmail(email);
    if (userExists) {
      throw new AppError("User already exists", 404);
    } else {
      const user = await userDb.saveUser(userData);
      const accessToken = generateAccessToken(user._id.toString());
      return { accessToken, userId: user._id.toString() };
    }
  };

export const logIn =
  (userDb) =>
  async (email: string, password: string): Promise<any> => {
    const user = await userDb.findByEmail(email);
    if (user && (await matchPassword(password, user.password))) {
      const accessToken = generateAccessToken(user._id.toString());
      return { accessToken, userId: user._id.toString() };
    }
    throw new AppError("Password incorrect", 400);
  };

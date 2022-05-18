import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as authService from "./auth.service";
import * as userDb from "../user/user.repositroy";

export const registerUser = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const { userName, email, password, age } = req.body;
    const userData = {
      userName,
      email,
      password,
      age,
    };
    const register = authService.registerUser(userDb);
    const { accessToken, userId } = await register(userData);
    return res.status(201).json({
      status: "success",
      message: "User created",
      accessToken,
      userId,
    });
  }
);

export const logIn = catchAsync(
  async (req: Request, res: Response): Promise<Response> => {
    const { email, password } = req.body;
    const loginFunc = authService.logIn(userDb);
    const { accessToken, userId } = await loginFunc(email, password);
    return res.status(201).json({
      status: "success",
      message: "User logged in",
      accessToken,
      userId,
    });
  }
);

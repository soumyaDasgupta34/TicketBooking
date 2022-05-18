import express from "express";
import * as authController from "./auth.controller";

const router = express.Router();

router.post("/registerUser", authController.registerUser);
router.post("/login", authController.logIn);

export default router;

import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middlewares/errorHandlingMiddleware";
import authRouter from "./auth/auth.route";
import busRouter from "./bus/bus.route";
import seatRouter from "./seat/seat.route";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/bus", busRouter);
app.use("/api/v1/seat", seatRouter);
app.use(globalErrorHandler);

export default app;

import express from "express";
import { authenticateJWT } from "../middlewares/authenticationMiddleware";
import * as seatController from "./seat.controller";

const router = express.Router();

router.post("/book/:bid", authenticateJWT, seatController.bookSeat);
router.get("/booked", authenticateJWT, seatController.getBookedSeats);
router.get("/booked/:bid", authenticateJWT, seatController.getAvailableTickets);
router.delete("/cancel/:sid", authenticateJWT, seatController.cancelSeat);
router.get("/tickets/:bid", authenticateJWT, seatController.getTickets);
router.delete("/reset/:bid",authenticateJWT)

export default router;

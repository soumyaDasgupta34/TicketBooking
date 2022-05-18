import express from "express";
import * as busController from "../bus/bus.controller";
import { authenticateJWT } from "../middlewares/authenticationMiddleware";

const router = express.Router();
router.post("/addBus", authenticateJWT, busController.addBus);
// router.get("/getAllBus", authenticateJWT, busController.getAllBus);
router.get("/findBus", busController.findBus);
router.get("/getBusById/:bid", authenticateJWT, busController.getBusById);

export default router;

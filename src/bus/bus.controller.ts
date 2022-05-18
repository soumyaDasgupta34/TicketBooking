import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as busService from "./bus.service";
import * as busDb from "./bus.repository";
import AppError from "../middlewares/errorHandlingMiddleware";
import BusModel from "./bus.repository";

export const addBus = catchAsync(async (req: Request, res: Response) => {
  const { number, source, destination, startTime, ticketPrice } = req.body;
  const busData = {
    number,
    source,
    destination,
    startTime,
    ticketPrice,
  };
  const createBusFunc = busService.createBus(busDb);
  await createBusFunc(busData);
  return res.status(201).json({
    status: "success",
    message: "Bus added",
  });
});

export const getAllBus = catchAsync(async (req: Request, res: Response) => {
  const getAllBusFunc = busService.getAllBus(busDb);
  const page: number = Number(req.query.page) || 1;
  const skip: number = (page - 1) * 10;
  const buses = await getAllBusFunc(skip);
  if (!buses) {
    throw new AppError("No buses found", 404);
  }
  return res.status(200).json({
    status: "success",
    data: buses,
  });
});

export const findBus = catchAsync(async (req: Request, res: Response) => {
  const findBusFunc = busService.findBus(busDb);
  const source = req.query.source as string;
  const destination = req.query.destination as string;
  const buses = await findBusFunc(source, destination);
  if (!(buses.length > 0)) {
    throw new AppError("No buses found", 404);
  }
  return res.status(200).json({
    status: "success",
    data: buses,
  });
});

export const getBusById = catchAsync(async (req: Request, res: Response) => {
  const busId = req.params.bid as string;
  const getBusByIdFunc = busService.getBusById(busDb);
  const bus = await getBusByIdFunc(busId);
  return res.status(200).json({
    status: "success",
    data: bus,
  });
});

import { Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import * as seatService from "./seat.service";
import * as seatDb from "./seat.repository";

export const bookSeat = catchAsync(async (req: Request, res: Response) => {
  const bookSeatFunc = seatService.bookSeat(seatDb);
  const busId = req.params.bid;
  const userId = "627fb5089e769feb78c62d03";
  const bookings = req.body.bookingDetails;
  await bookSeatFunc(busId, bookings, userId.toString());
  return res.status(201).json({
    status: "success",
    message: "Booking successful",
  });
});

export const getBookedSeats = catchAsync(
  async (req: Request, res: Response) => {
    const getBookedSeatsFunc = seatService.getBookedSeats(seatDb);
    const userId = "627fb5089e769feb78c62d03";
    const bookingDetails = await getBookedSeatsFunc(userId);
    return res.status(200).json({
      status: "success",
      data: bookingDetails,
    });
  }
);

export const getAvailableTickets = catchAsync(
  async (req: Request, res: Response) => {
    const getAvailableTicketsFunc = seatService.getAvailableTickets(seatDb);
    const busId = req.params.bid;
    const availableTickets = await getAvailableTicketsFunc(busId);
    return res.status(200).json({
      status: "success",
      data: availableTickets,
    });
  }
);

export const cancelSeat = catchAsync(async (req: Request, res: Response) => {
  const cancelSeatFunc = seatService.cancelSeat(seatDb);
  const seatId = req.params.sid;
  await cancelSeatFunc(seatId);
  return res.status(200).json({
    status: "success",
    message: "Deleted tickets",
  });
});

export const getTickets = catchAsync(async (req: Request, res: Response) => {
  const getTicketsFunc = seatService.getTickets(seatDb);
  const busId = req.params.bid;
  const tickets = await getTicketsFunc(busId);
  return res.status(200).json({
    status: "success",
    data: tickets,
  });
});

export const resetBus = catchAsync(async (req: Request, res: Response) => {
  const resetBusFunc = seatService.resetBus(seatDb);
  const busId = req.params.bid;
  await resetBusFunc(busId);
  return res.status(200).json({
    status: "success",
    message: "Deleted Bookings",
  });
});

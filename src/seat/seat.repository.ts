import { ISeat } from "./seat.interface";
import { Schema, model } from "mongoose";
import BusModel from "../bus/bus.repository";

const seatSchema = new Schema<ISeat>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    busId: { type: Schema.Types.ObjectId, ref: "bus" },
    seatNumber: { type: Number, required: true, min: 1, max: 40, unique: true },
    passengerName: { type: String, required: true },
    passengerAge: { type: Number, required: true },
  },
  {
    collection: "seat",
  }
);

const SeatModel = model<ISeat>("seat", seatSchema);

export const bookSeat = async (
  busId: string,
  bookings: Array<any>,
  userId: string
): Promise<void> => {
  let session;
  try {
    session = await SeatModel.startSession();
    session.startTransaction();
    for (let i = 0; i < bookings.length; i++) {
      const seat = {
        user: userId,
        busId: busId,
        seatNumber: bookings[i].seatNumber,
        passengerName: bookings[i].passengerName,
        passengerAge: bookings[i].passengerAge,
      };
      await SeatModel.create([seat], { session });
    }
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
  } finally {
    session.endSession();
  }
};

export const getBookedTickets = async (userId: string): Promise<any> => {
  const bookingDetails = [];
  const bookedSeats = await SeatModel.find({ user: userId });
  for (let i = 0; i < bookedSeats.length; i++) {
    const booking = {};
    const bus = await BusModel.findOne({ _id: bookedSeats[i].busId });
    booking["source"] = bus.source;
    booking["destination"] = bus.destination;
    booking["startTime"] = bus.startTime;
    booking["ticketPrice"] = bus.ticketPrice;
    booking["seatId"] = bookedSeats[i]._id;
    booking["seatNumber"] = bookedSeats[i].seatNumber;
    booking["passengerName"] = bookedSeats[i].passengerName;
    booking["passengerAge"] = bookedSeats[i].passengerAge;
    bookingDetails.push(booking);
  }
  return bookingDetails;
};

export const getAvailableTickets = async (busId: string) => {
  const bookedSeatRefs = await SeatModel.find({ bus_id: busId });
  const bookedSeats = new Set(bookedSeatRefs.map((seat) => seat.seatNumber));
  let availableTickets = [];
  for (let i = 1; i <= 40; i++) {
    if (!bookedSeats.has(i)) {
      availableTickets.push(i);
    }
  }
  return availableTickets;
};

export const cancelSeat = async (seatId: string) => {
  return SeatModel.deleteOne({ _id: seatId });
};

export const getTickets = async (busId: string) => {
  return SeatModel.find({ busId: busId });
};

export const resetBus = async (busId: string) => {
  return SeatModel.deleteMany({ busId: busId });
};

export default SeatModel;

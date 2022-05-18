import { Types } from "mongoose";

export interface IBus {
  _id?: Types.ObjectId;
  number: string;
  source: string;
  destination: string;
  startTime: string;
  ticketPrice: number;
}

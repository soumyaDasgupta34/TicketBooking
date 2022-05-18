import { Types } from "mongoose";

export interface ISeat {
  _id?: Types.ObjectId;
  user: string;
  busId: string;
  seatNumber: number;
  passengerName: string;
  passengerAge: number;
}

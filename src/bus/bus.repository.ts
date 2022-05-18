import { IBus } from "./bus.interface";
import { Schema, model } from "mongoose";

const busSchema = new Schema<IBus>(
  {
    number: { type: String },
    source: { type: String, required: true },
    destination: { type: String, required: true },
    startTime: { type: String, required: true },
    ticketPrice: { type: Number, required: true },
  },
  { collection: "bus" }
);

const BusModel = model<IBus>("bus", busSchema);

export const createBus = async (busData: IBus): Promise<IBus> =>
  BusModel.create(busData);

export const getAllBus = async (skip: number): Promise<any> =>
  BusModel.find({});

export const findBus = async (
  source?: string,
  destination?: string
): Promise<Array<IBus>> => {
  if (source && destination) {
    return BusModel.find({ source: source, destination: destination });
  }
  if (source) {
    return BusModel.find({ source: source });
  } else if (destination) {
    return BusModel.find({ destination: destination });
  } else {
    return BusModel.find({});
  }
};
export const getBusById = async (busId: string) => {
  return BusModel.findOne({ _id: busId });
};

export default BusModel;

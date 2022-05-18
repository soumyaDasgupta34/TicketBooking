import { IBus } from "./bus.interface";

export const createBus =
  (busDb) =>
  async (busData: IBus): Promise<IBus> => {
    return busDb.createBus(busData);
  };

export const getAllBus =
  (busDb) =>
  async (skip: number): Promise<Array<IBus>> => {
    return busDb.getAllBus(skip);
  };

export const findBus =
  (busDb) =>
  async (source?: string, destination?: string): Promise<Array<IBus>> => {
    return busDb.findBus(source, destination);
  };

export const getBusById =
  (busDb) =>
  async (busId: string): Promise<IBus> => {
    return busDb.getBusById(busId);
  };

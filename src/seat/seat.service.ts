export const bookSeat =
  (seatDb) =>
  async (
    busId: string,
    bookings: Array<any>,
    userId: string
  ): Promise<void> => {
    return seatDb.bookSeat(busId, bookings, userId);
  };
export const getBookedSeats =
  (seatDb) =>
  async (userId: string): Promise<any> => {
    return seatDb.getBookedTickets(userId);
  };

export const getAvailableTickets = (seatDb) => async (busId: string) => {
  return seatDb.getAvailableTickets(busId);
};

export const cancelSeat = (seatDb) => async (seatId: string) =>
  seatDb.cancelSeat(seatId);

export const getTickets = (seatDb) => async (busId: string) =>
  seatDb.getTickets(busId);

export const resetBus = (seatDb) => async (busId: string) =>
  seatDb.resetBus(busId);

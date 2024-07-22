import { createAsyncThunk } from "@reduxjs/toolkit";
import BookinJson from "../../data/Booking.json";
import { Booking } from "../../types/global";


const BookinThunkPromise = (data: Booking[]): Promise<Booking[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

export const BookinThunk = createAsyncThunk<Booking[], void>(
  "bookin/getBookinList",
  async () => {
    const bookings = await BookinThunkPromise(BookinJson as Booking[]);
    return bookings;
  }
);

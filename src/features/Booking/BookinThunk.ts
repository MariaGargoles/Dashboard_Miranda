import { createAsyncThunk } from "@reduxjs/toolkit";
import BookinJson from "../../data/Booking.json";

interface Bookin {
  id: string;
  Name: string;
  OrderDate: string;
  CheckIn: string;
  CheckOut: string;
  SpecialRequest: string;
  RoomType: string;
  RoomNumber: string;
  Status: string;
}

const BookinThunkPromise = (data: Bookin[]): Promise<Bookin[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

export const BookinThunk = createAsyncThunk<Bookin[], void>(
  "bookin/getBookinList",
  async () => {
    const bookings = await BookinThunkPromise(BookinJson as Bookin[]);
    return bookings;
  }
);

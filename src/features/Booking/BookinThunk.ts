import { createAsyncThunk } from "@reduxjs/toolkit";
import BookinJson from "../../data/Booking.json";
import { Booking } from "../../types/global";
import delay from "../Messages/MessagesThunk";

type Bookin = Booking[];

export const BookinThunk = createAsyncThunk<Bookin>(
  "bookin/getBookinList",
  async () => {
    const bookings = await delay<Bookin>(BookinJson);
    return bookings;
  }
);

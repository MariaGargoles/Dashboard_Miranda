import { createAsyncThunk } from "@reduxjs/toolkit";
import BookinJson from "../../data/Booking.json";

const BookinThunkPromise = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

export const BookinThunk = createAsyncThunk("users/getUsersList", async () => {
  const booking = await BookinThunkPromise(BookinJson);
  return booking;
});

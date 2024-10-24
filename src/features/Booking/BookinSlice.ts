import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  fetchBookingsListThunk,
  fetchSingleBookingThunk,
  addBookingThunk,
  updateBookingThunk,
  deleteBookingThunk
} from "./BookinThunk";
import { Booking, BookingState } from "../../types/global";

// Estado inicial
const initialState: BookingState = {
  status: 'idle',
  data: [],  // Asegúrate de que sea un array al inicio
  error: null,
};

export const BookinSlice = createSlice({
  name: "bookin",
  initialState,
  reducers: {
    addBookin: (state, action: PayloadAction<Booking>) => {
      state.data.push(action.payload);
    },
    deleteBookin: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((data) => data._id !== action.payload);
    },
    updateBookin: (state, action: PayloadAction<Booking>) => {
      const index = state.data.findIndex(
        (booking) => booking._id === action.payload._id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookingsListThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBookingsListThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "fulfilled";
        state.data = action.payload.data;
        if (Array.isArray(action.payload)) {
          state.data = action.payload;
        } else {
          state.error = "Data received is not an array";
        }
      })
      .addCase(fetchBookingsListThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || "Error fetching bookings";
      })
      .addCase(fetchSingleBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
        const index = state.data.findIndex((booking) => booking._id === action.payload._id);
        if (index === -1) {
          state.data.push(action.payload); 
        }
      })
      .addCase(addBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
        state.data.push(action.payload);
      })
      .addCase(updateBookingThunk.fulfilled, (state, action: PayloadAction<Booking>) => {
        const index = state.data.findIndex((booking) => booking._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload; 
        }
      })
      .addCase(deleteBookingThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((booking) => booking._id !== action.payload); 
      });
  },
});

export const { addBookin, deleteBookin, updateBookin } = BookinSlice.actions;
export default BookinSlice.reducer;

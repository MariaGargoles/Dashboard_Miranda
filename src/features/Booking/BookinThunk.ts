import { createAsyncThunk } from "@reduxjs/toolkit";
import { Booking } from "../../types/global";
import  { ApiConnect } from "../Connect API/ConnectApi"


export const fetchBookingsListThunk = createAsyncThunk<Booking[]>(
  "booking/getBookingsList",
  async () => {
    try {
      const bookings = await ApiConnect("/bookings", "GET");
      return bookings;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      throw error;
    }
  }
);

export const fetchSingleBookingThunk = createAsyncThunk<Booking, string>(
  "booking/getSingleBooking",
  async (id: string) => {
    try {
      const booking = await ApiConnect(`/bookings/${id}`, "GET");
      return booking;
    } catch (error) {
      console.error("Error fetching booking:", error);
      throw error;
    }
  }
);

export const addBookingThunk = createAsyncThunk<Booking, Partial<Booking>>(
  "booking/postBooking",
  async (bookingData) => {
    try {
      const newBooking = await ApiConnect("/bookings/newBooking", "POST", bookingData);
      return newBooking;
    } catch (error) {
      console.error("Error adding booking:", error);
      throw error;
    }
  }
);

export const updateBookingThunk = createAsyncThunk<Booking, Booking>(
  "booking/putBooking",
  async (bookingData) => {
    try {
      const updatedBooking = await ApiConnect(`/bookings/${bookingData._id}`, "PUT", bookingData);
      return updatedBooking;
    } catch (error) {
      console.error("Error updating booking:", error);
      throw error;
    }
  }
);

export const deleteBookingThunk = createAsyncThunk<string, string>(
  "booking/deleteBooking",
  async (id: string) => {
    try {
      await ApiConnect(`/bookings/delete/${id}`, "DELETE");
      return id;
    } catch (error) {
      console.error("Error deleting booking:", error);
      throw error;
    }
  }
);
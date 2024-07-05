import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RoomsThunk } from "./RoomThunk";

export const BookinSlice = createSlice({
  name: "bookin",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: {
    addBookin: (state, action) => {
      state.data.push(action.payload);
      console.log("Añadido con exito");
    },
    deleteBookin: (state, action) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
    },
    updateBookin: (state, action) => {
      const index = state.data.findIndex(
        (room) => room.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BookinThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(BookinThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(BookinThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { addBookin, deleteBookin, updateBookin } = BookinSlice.actions;
export default BookinSlice.reducer;

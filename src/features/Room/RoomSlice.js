import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RoomsThunk } from "./RoomThunk";

export const RoomSlice = createSlice({
  name: "room",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: {
    addRoom: (state, action) => {
      state.data.push(action.payload);
      console.log("Añadido con exito");
    },
    deleteRoom: (state, action) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(RoomsThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(RoomsThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(RoomsThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { addRoom, deleteRoom } = RoomSlice.actions;
export default RoomSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRoomsListThunk,
  fetchSingleRoomThunk,
  addRoomThunk,
  updateRoomThunk,
  deleteRoomThunk
} from "./RoomThunk";
import { Room } from "../../types/global";

interface RoomState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  data: Room[];
  error: string | null;
  room: Room | null;
}

const initialState: RoomState = {
  status: 'idle',
  data: [],
  error: null,
  room: null,
};

const RoomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    addRoom: (state, action: PayloadAction<Room>) => {
      state.data.push(action.payload);
      console.log("Room added successfully");
    },
    deleteRoom: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((room) => room._id !== action.payload); 
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
      const index = state.data.findIndex(
        (room) => room._id === action.payload._id 
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoomsListThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchRoomsListThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "fulfilled";
        state.data = action.payload.data; 
        if (!Array.isArray(action.payload)) {
          state.error = "Data received is not an array";
        }
      })
      .addCase(fetchRoomsListThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || null;
      })
      .addCase(fetchSingleRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
        const index = state.data.findIndex((room) => room._id === action.payload._id);
        if (index === -1) {
          state.data.push(action.payload); 
        }
      })
      .addCase(addRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
        state.data.push(action.payload);
      })
      .addCase(updateRoomThunk.fulfilled, (state, action: PayloadAction<Room>) => {
        const index = state.data.findIndex((room) => room._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(deleteRoomThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((room) => room._id !== action.payload);
      });
  },
});

export const { addRoom, deleteRoom, updateRoom } = RoomSlice.actions;
export default RoomSlice.reducer;

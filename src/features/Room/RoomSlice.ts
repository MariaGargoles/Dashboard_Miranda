import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RoomsThunk } from "./RoomThunk";
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
      state.data = state.data.filter((room) => room.id !== action.payload);
    },
    updateRoom: (state, action: PayloadAction<Room>) => {
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
      .addCase(RoomsThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(RoomsThunk.fulfilled, (state, action: PayloadAction<Room[]>) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(RoomsThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || null;
      });
  },
});

export const { addRoom, deleteRoom, updateRoom } = RoomSlice.actions;
export default RoomSlice.reducer;

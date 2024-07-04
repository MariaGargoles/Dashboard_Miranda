import { createSlice } from "@reduxjs/toolkit";

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
  },
});

export const { addRoom } = RoomSlice.actions;
export default RoomSlice.reducer;

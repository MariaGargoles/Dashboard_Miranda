import { createAsyncThunk } from "@reduxjs/toolkit";
import RoomJson from "../../data/Rooms.json";

const RoomThunkPromise = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

export const RoomsThunk = createAsyncThunk("room/getRoomList", async () => {
  const rooms = await RoomThunkPromise(RoomJson);
  return rooms;
});

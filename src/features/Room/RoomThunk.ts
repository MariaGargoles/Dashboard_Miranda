import { createAsyncThunk } from "@reduxjs/toolkit";
import RoomJson from "../../data/Rooms.json";
import { Room } from "../../types/global";
import delay from "../Messages/MessagesThunk";

type Rooms = Room[];

export const RoomsThunk = createAsyncThunk<Rooms>(
  "room/getRoomList",
  async () => {
    const rooms = await delay<Rooms>(RoomJson);
    return rooms;
  }
);

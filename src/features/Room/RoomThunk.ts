import { createAsyncThunk } from "@reduxjs/toolkit";
import RoomJson from "../../data/Rooms.json";


interface Room {
  photo: string;
  number: string;
  id: string;
  BedType: string;
  Amenities: string[];
  Rate: number;
  OfferPrice: number;
  Status: string;
  RoomFloor: string;
}

type Rooms = Room[];


const RoomThunkPromise = (data: Rooms): Promise<Rooms> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};


export const RoomsThunk = createAsyncThunk<Rooms>(
  "room/getRoomList",
  async () => {
    const rooms = await RoomThunkPromise(RoomJson as Rooms);
    return rooms;
  }
);

import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../context/AuthUserContext";
import { addRoom } from "../features/Room/RoomSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: addRoom,
  },
});

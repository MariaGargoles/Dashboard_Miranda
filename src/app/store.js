import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../context/AuthUserContext";
import roomReducer from "../features/Room/RoomSlice";
import { BookinReducer } from "../features/Booking/BookinSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    bookin: BookinReducer,
  },
});

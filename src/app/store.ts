import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../context/AuthUserContext";
import roomReducer from "../features/Room/RoomSlice";
import bookinReducer from "../features/Booking/BookinSlice";
import userReducer from "../features/Users/UserSlice";
import contactReducer from "../features/Messages/MessagesSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    room: roomReducer,
    bookin: bookinReducer,
    users: userReducer,
    contact: contactReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
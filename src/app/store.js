import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../context/AuthUserContext";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

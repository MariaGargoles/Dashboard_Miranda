import { createAsyncThunk } from "@reduxjs/toolkit";
import UsersJson from "../../data/Users.json";

const UsersThunkPromise = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

export const UsersThunk = createAsyncThunk("users/getUsersList", async () => {
  const users = await UsersThunkPromise(UsersJson);
  return users;
});

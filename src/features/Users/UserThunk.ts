import { createAsyncThunk } from "@reduxjs/toolkit";
import UsersJson from "../../data/Users.json";
import { User } from "../../types/global";
import delay from "../Messages/MessagesThunk";

type Users = User[];

export const UsersThunk = createAsyncThunk<Users>(
  "users/getUsersList", 
  async () => {
    const users = await delay<Users>(UsersJson);
    return users;
  }
);

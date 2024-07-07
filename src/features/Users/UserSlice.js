import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UsersThunk } from "./UserThunk";

export const UsersSlice = createSlice({
  name: "users",
  initialState: {
    status: "idle",
    data: [],
    error: null,
  },
  reducers: {
    addUser: (state, action) => {
      state.data.push(action.payload);
      console.log("Añadido con éxito");
    },
    deleteUser: (state, action) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
    },
    updateUser: (state, action) => {
      const index = state.data.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UsersThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(UsersThunk.fulfilled, (state, action) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(UsersThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message;
      });
  },
});

export const { addUser, deleteUser, updateUser } = UsersSlice.actions;
export default UsersSlice.reducer;

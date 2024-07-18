import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { UsersThunk } from "./TSUserThunk";

interface User {
  foto: string;
  name: string;
  id: string;
  startDate: string;
  description: string;
  email: string;
  contact: string;
  status: string;
}

interface UsersState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  data: User[];
  error: string | null;
}

const initialState: UsersState = {
  status: 'idle',
  data: [],
  error: null,
};

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.data.push(action.payload);
      console.log("Añadido con éxito");
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
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
      .addCase(UsersThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(UsersThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || null;
      });
  },
});

export const { addUser, deleteUser, updateUser } = UsersSlice.actions;
export default UsersSlice.reducer;

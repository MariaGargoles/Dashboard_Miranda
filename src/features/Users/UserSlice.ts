import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserStateStates } from '../../types/global';
import { UsersThunk } from "./UserThunk";

const initialState: UserStateStates = {
  data: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<User>) => {
      state.data.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.data.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UsersThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(UsersThunk.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = 'fulfilled';
        state.data = action.payload;
        state.error = null;
      })
      .addCase(UsersThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Unknown error';
      });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserStateStates } from '../../types/global';

export const initialState: UserStateStates = {
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
      state.status = 'fulfilled';
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.data.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
      state.status = 'fulfilled';
      state.error = null;
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
    setPending: (state) => {
      state.status = 'pending';
    },
    setRejected: (state, action: PayloadAction<string>) => {
      state.status = 'rejected';
      state.error = action.payload;
    },
  },
});

export const { addUser, updateUser, deleteUser, setPending, setRejected } = userSlice.actions;
export default userSlice.reducer;

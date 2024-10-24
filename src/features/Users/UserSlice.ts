import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserStateStates } from '../../types/global';
import { 
  fetchUsersListThunk,
  fetchSingleUserThunk,
  addUserThunk,
  updateUserThunk,
  deleteUserThunk 
} from './UserThunk';

// Estado inicial
const initialState: UserStateStates = {
  data: [],
  status: 'idle',
  error: null,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // Agregar un nuevo usuario
    addUser: (state, action: PayloadAction<User>) => {
      state.data.push(action.payload);
    },
    // Actualizar un usuario existente
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.data.findIndex((user) => user._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
    // Eliminar un usuario por su ID
    deleteUser: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((user) => user._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersListThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchUsersListThunk.fulfilled, (state, action: PayloadAction<any>) => {
        state.status = "fulfilled";
        state.data = action.payload.data;
        state.error = null;
      })
      .addCase(fetchUsersListThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.error.message || 'Error desconocido';
      })
      .addCase(fetchSingleUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.data.findIndex((user) => user._id === action.payload._id);
        if (index === -1) {
          state.data.push(action.payload); 
        }
      })
      .addCase(addUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.data.push(action.payload);
      })
      .addCase(updateUserThunk.fulfilled, (state, action: PayloadAction<User>) => {
        const index = state.data.findIndex((user) => user._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload; 
        }
      })
      .addCase(deleteUserThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((user) => user._id !== action.payload); 
      });
  },
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export interface User {  
  foto: string;          
  name: string;         
  id: string;           
  startDate: string;    
  description: string;  
  email: string;        
  contact: string;      
  status: string;       
}
interface UserState {
  data: User[];
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: string | null;
}

const initialState: UserState = {
  data: [],
  status: 'idle',
  error: null,
};


export const addUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/addUser',
  async (user, { rejectWithValue }) => {
    try {
      // Simula una solicitud a una API
      return user;
    } catch (error) {
      return rejectWithValue('Failed to add user');
    }
  }
);

export const updateUser = createAsyncThunk<User, User, { rejectValue: string }>(
  'users/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      // Simula una solicitud a una API
      return user;
    } catch (error) {
      return rejectWithValue('Failed to update user');
    }
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    deleteUser: (state, action) => {
      state.data = state.data.filter((user) => user.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.data.push(action.payload);
        state.error = null;
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string || 'Failed to add user';
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        const index = state.data.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string || 'Failed to update user';
      });
  },
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;

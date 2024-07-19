import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BookinThunk } from "./BookinThunk";


interface Bookin {
  id: string;
  Name: string;
  OrderDate: string;
  CheckIn: string;
  CheckOut: string;
  SpecialRequest: string;
  RoomType: string;
  RoomNumber: string;
  Status: string;
}


interface BookinState {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  data: Bookin[];
  error: string | null;
}


const initialState: BookinState = {
  status: 'idle',
  data: [],
  error: null,
};


export const BookinSlice = createSlice({
  name: "bookin",
  initialState,
  reducers: {

    addBookin: (state, action: PayloadAction<Bookin>) => {
      state.data.push(action.payload);
      console.log("Añadido con éxito");
    },

    deleteBookin: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((data) => data.id !== action.payload);
    },

    updateBookin: (state, action: PayloadAction<Bookin>) => {
      const index = state.data.findIndex(
        (bookin) => bookin.id === action.payload.id
      );
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(BookinThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(BookinThunk.fulfilled, (state, action: PayloadAction<Bookin[]>) => {
        state.status = "fulfilled";
        state.data = action.payload;
      })
      .addCase(BookinThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || null;
      });
  },
});

export const { addBookin, deleteBookin, updateBookin } = BookinSlice.actions;
export default BookinSlice.reducer;

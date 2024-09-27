import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { 
  fetchMessagesListThunk,
  addMessageThunk,
  updateMessageThunk,
  deleteMessageThunk 
} from "./MessagesThunk";
import { ContactMessage, ContactState } from "../../types/global";

const initialState: ContactState = {
    status: 'idle',
    data: [],
    error: null,
    message: null
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<ContactMessage>) => {
      state.data.push(action.payload);
    },
    deleteMessage: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((message) => message._id !== action.payload);
    },
    updateMessage: (state, action: PayloadAction<ContactMessage>) => {
      const index = state.data.findIndex((message) => message._id === action.payload._id);
      if (index !== -1) {
        state.data[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMessagesListThunk.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchMessagesListThunk.fulfilled, (state, action: PayloadAction<ContactMessage[]>) => {
        state.status = "fulfilled";
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchMessagesListThunk.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.error.message || null;
      })
      .addCase(addMessageThunk.fulfilled, (state, action: PayloadAction<ContactMessage>) => {
        state.data.push(action.payload);
      })
      .addCase(updateMessageThunk.fulfilled, (state, action: PayloadAction<ContactMessage>) => {
        const index = state.data.findIndex((message) => message._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload; 
        }
      })
      .addCase(deleteMessageThunk.fulfilled, (state, action: PayloadAction<string>) => {
        state.data = state.data.filter((message) => message._id !== action.payload); 
      });
  },
});

export const { addMessage, deleteMessage, updateMessage } = contactSlice.actions;
export default contactSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContactMessagesThunk } from "./MessagesThunk";
import { ContactMessage, ContactState } from "../../types/global";



const initialState: ContactState = {
    status: 'idle',
    data: [],
    error: null,
    message: null,
};

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addMessage: (state, action: PayloadAction<ContactMessage>) => {
            state.data.push(action.payload);
            console.log("Message added successfully");
        },
        deleteMessage: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter((message) => message.id !== action.payload);
        },
        updateMessage: (state, action: PayloadAction<ContactMessage>) => {
            const index = state.data.findIndex(
                (message) => message.id === action.payload.id
            );
            if (index !== -1) {
                state.data[index] = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(ContactMessagesThunk.pending, (state) => {
                state.status = "pending";
            })
            .addCase(ContactMessagesThunk.fulfilled, (state, action: PayloadAction<ContactMessage[]>) => {
                state.status = "fulfilled";
                state.data = action.payload;
            })
            .addCase(ContactMessagesThunk.rejected, (state, action) => {
                state.status = "rejected";
                state.error = action.error.message || null;
            });
    },
});

export const { addMessage, deleteMessage, updateMessage } = contactSlice.actions;
export default contactSlice.reducer;

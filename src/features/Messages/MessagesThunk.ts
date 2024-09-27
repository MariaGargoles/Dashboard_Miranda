import { createAsyncThunk } from "@reduxjs/toolkit";
import { ContactMessage } from "../../types/global";
import { ApiConnect } from "../Connect API/ConnectApi";

export const fetchMessagesListThunk = createAsyncThunk<ContactMessage[]>(
  "messages/getMessagesList",
  async () => {
    try {
      const messages = await ApiConnect("/contact", "GET");
      return messages;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  }
);

export const addMessageThunk = createAsyncThunk<ContactMessage, Partial<ContactMessage>>(
  "messages/postMessage",
  async (messageData) => {
    try {
      const newMessage = await ApiConnect("/contact", "POST", messageData);
      return newMessage;
    } catch (error) {
      console.error("Error adding message:", error);
      throw error;
    }
  }
);

export const updateMessageThunk = createAsyncThunk<ContactMessage, ContactMessage>(
  "messages/putMessage",
  async (messageData) => {
    try {
      const updatedMessage = await ApiConnect(`/contact/${messageData._id}`, "PUT", messageData);
      return updatedMessage;
    } catch (error) {
      console.error("Error updating message:", error);
      throw error;
    }
  }
);

export const deleteMessageThunk = createAsyncThunk<string, string>(
  "messages/deleteMessage",
  async (id: string) => {
    try {
      await ApiConnect(`/contact/${id}`, "DELETE");
      return id;
    } catch (error) {
      console.error("Error deleting message:", error);
      throw error;
    }
  }
);

import { createAsyncThunk } from "@reduxjs/toolkit";
import ContactJson from "../../data/ContactMessages.json";
import { ContactMessage } from "../../types/global";

type ContactMessages = ContactMessage[];

function delay<T>(data: T, time: number = 200): Promise<T> {
    return new Promise((resolve) => {
        setTimeout(() => resolve(data), time);
    });
}

export const ContactMessagesThunk = createAsyncThunk<ContactMessages>(
    "contact/getContactList",
    async () => {
        const contactMessages = await delay<ContactMessages>(ContactJson);
        return contactMessages;
    }
);

export default delay
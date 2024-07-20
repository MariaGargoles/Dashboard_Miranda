import { createAsyncThunk } from "@reduxjs/toolkit";
import ContactJson from "../../data/ContactMessages.json";

interface ContactMessage {
    id: number;
    date: string;
    name: string;
    email: string;
    subject: string;
    comment: string;
    action: 'publish' | 'archived';
}

type ContactMessages = ContactMessage[];

const ContactThunkPromise = (data: ContactMessages): Promise<ContactMessages> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(data);
        }, 200);
    });
};

export const ContactMessagesThunk = createAsyncThunk<ContactMessages>(
    "contact/getContactList",
    async () => {
        const contactMessages = await ContactThunkPromise(ContactJson as ContactMessages);
        return contactMessages;
    }
);

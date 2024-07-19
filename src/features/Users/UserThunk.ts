import { createAsyncThunk } from "@reduxjs/toolkit";
import UsersJson from "../../data/Users.json";


interface User {
    foto: string;          
    name: string;         
    id: string;           
    startDate: string;    
    description: string;  
    email: string;        
    contact: string;      
    status: string;       
  }

const UsersThunkPromise = (data: User[]): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 200);
  });
};

export const UsersThunk = createAsyncThunk<User[], void>("users/getUsersList", async () => {
  const users = await UsersThunkPromise(UsersJson);
  return users;
});

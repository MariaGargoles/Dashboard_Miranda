import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../../types/global";
import { ApiConnect } from "../Connect API/ConnectApi";

// Obtener lista de usuarios
export const fetchUsersListThunk = createAsyncThunk<User[]>(
  "users/getUsersList",
  async () => {
    try {
      const users = await ApiConnect("/users", "GET");
      return users;
    } catch (error) {
      console.error("Error al obtener la lista de usuarios:", error);
      throw error;
    }
  }
);

// Obtener un usuario por ID
export const fetchSingleUserThunk = createAsyncThunk<User, string>(
  "users/getSingleUser",
  async (id: string) => {
    try {
      const user = await ApiConnect(`/users/${id}`, "GET");
      return user;
    } catch (error) {
      console.error("Error al obtener el usuario:", error);
      throw error;
    }
  }
);

// Agregar un nuevo usuario
export const addUserThunk = createAsyncThunk<User, Partial<User>>(
  "users/postUser",
  async (userData) => {
    try {
      const newUser = await ApiConnect("/users", "POST", userData);
      return newUser;
    } catch (error) {
      console.error("Error al agregar el usuario:", error);
      throw error;
    }
  }
);

// Actualizar un usuario existente
export const updateUserThunk = createAsyncThunk<User, User>(
  "users/putUser",
  async (userData) => {
    try {
      const updatedUser = await ApiConnect(`/users/${userData._id}`, "PUT", userData);
      return updatedUser;
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      throw error;
    }
  }
);

// Eliminar un usuario por ID
export const deleteUserThunk = createAsyncThunk<string, string>(
  "users/deleteUser",
  async (id: string) => {
    try {
      await ApiConnect(`/users/${id}`, "DELETE");
      return id;
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  }
);

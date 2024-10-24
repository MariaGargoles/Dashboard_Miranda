import { createAsyncThunk } from "@reduxjs/toolkit";
import { Room } from "../../types/global";
import { ApiConnect } from "../Connect API/ConnectApi";

// Obtener la lista de habitaciones
export const fetchRoomsListThunk = createAsyncThunk<Room[]>(
  "rooms/getRoomsList",
  async () => {
    try {
      const rooms = await ApiConnect("/rooms", "GET");
      return rooms;
    } catch (error) {
      console.error("Error fetching rooms:", error);
      throw error;
    }
  }
);

// Obtener una sola habitación por ID
export const fetchSingleRoomThunk = createAsyncThunk<Room, string>(
  "rooms/getSingleRoom",
  async (id: string) => {
    try {
      const room = await ApiConnect(`/rooms/${id}`, "GET");
      return room;
    } catch (error) {
      console.error("Error fetching room:", error);
      throw error;
    }
  }
);

// Agregar una nueva habitación
export const addRoomThunk = createAsyncThunk<Room, Partial<Room>>(
  "rooms/postRoom",
  async (roomData) => {
    try {
      const newRoom = await ApiConnect("/rooms", "POST", roomData);
      return newRoom;
    } catch (error) {
      console.error("Error adding room:", error);
      throw error;
    }
  }
);

// Actualizar una habitación existente utilizando "update"
export const updateRoomThunk = createAsyncThunk<Room, Room>(
  "rooms/updateRoom",  // Acción
  async (roomData) => {
    try {
      const updatedRoom = await ApiConnect(`/rooms/${roomData._id}/update`, "POST", roomData); // Cambia PATCH por POST hacia el endpoint /update
      return updatedRoom;
    } catch (error) {
      console.error("Error updating room:", error);
      throw error;
    }
  }
);




// Eliminar una habitación por ID
export const deleteRoomThunk = createAsyncThunk<string, string>(
  "rooms/deleteRoom",
  async (id: string) => {
    try {
      await ApiConnect(`/rooms/${id}`, "DELETE");
      return id;
    } catch (error) {
      console.error("Error deleting room:", error);
      throw error;
    }
  }
);

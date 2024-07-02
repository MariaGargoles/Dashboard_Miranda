import { createContext, useReducer } from "react";


const authReducer = (state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return {
          ...state,
          isAuthenticated: true,
          user: {
            name: action.payload.name,
            email: action.payload.email,
          },
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: {
            name: '',
            email: '',
          },
        };
      case 'UPDATE_USER':
        return {
          ...state,
          user: {
            ...state.user,
            name: action.payload.name,
            email: action.payload.email,
          },
        };
      default:
        return state;
    }
  };
  

export const UserContext = createContext(null);

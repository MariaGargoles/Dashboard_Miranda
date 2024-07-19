import React, { createContext, useEffect, ReactNode, FC } from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import type { RootState } from "../app/store";

interface AuthState {
  name: string | null;
  email: string | null;
  isAuthenticated: boolean;
}

interface LoginPayload {
  name: string;
  email: string;
}

const initialState: AuthState = {
  name: null,
  email: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginPayload>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.isAuthenticated = true;
    },
    logout(state) {
      state.name = null;
      state.email = null;
      state.isAuthenticated = false;
    },
    editUser(state, action: PayloadAction<LoginPayload>) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    },
  },
});

export const { login, logout, editUser } = authSlice.actions;
export const authReducer = authSlice.reducer;

interface AuthContextProps {
  state: AuthState;
  login: (name: string, email: string) => void;
  logout: () => void;
  updateUser: (name: string, email: string) => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    const storedState = localStorage.getItem('auth');
    if (storedState) {
      const parsedState = JSON.parse(storedState) as AuthState;
      if (parsedState.isAuthenticated) {
        dispatch(login({ name: parsedState.name!, email: parsedState.email! }));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(state));
  }, [state]);

  const updateUser = (name: string, email: string) => {
    dispatch(editUser({ name, email }));
  };

  return (
    <AuthContext.Provider value={{ state, login: (name, email) => dispatch(login({ name, email })), logout: () => dispatch(logout()), updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

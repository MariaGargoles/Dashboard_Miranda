import React, { createContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const initialState = {
  name: null,
  email: null,
  isAuthenticated: false,
};

 export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, name: action.payload.name, email: action.payload.email, isAuthenticated: true };
    case 'LOGOUT':
      return { name: null, email: null, isAuthenticated: false };
    case 'EDITUSER':
      return { ...state, name: action.payload.name, email: action.payload.email };
    default:
      return state;
  }
};

export const loginUser = (payload) => ({ type: 'LOGIN', payload });
export const logoutUser = () => ({ type: 'LOGOUT' });
export const editUser = (payload) => ({ type: 'EDITUSER', payload });

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth);

  useEffect(() => {
    const storedState = localStorage.getItem('auth');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState.isAuthenticated) {
        dispatch(loginUser({ name: parsedState.name, email: parsedState.email }));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(state));
  }, [state]);

  const updateUser = (name, email) => {
    dispatch(editUser({ name, email }));
  };

  return (
    <AuthContext.Provider value={{ state, login: (name, email) => dispatch(loginUser({ name, email })), logout: () => dispatch(logoutUser()), updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

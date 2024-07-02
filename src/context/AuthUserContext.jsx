import React, { createContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: {
    name: '',
    email: '',
  },
};

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

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState, (initial) => {
    const localData = localStorage.getItem('authState');
    return localData ? JSON.parse(localData) : initial;
  });

  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  const login = (name, email) => {
    dispatch({ type: 'LOGIN', payload: { name, email } });
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const updateUser = (name, email) => {
    dispatch({ type: 'UPDATE_USER', payload: { name, email } });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

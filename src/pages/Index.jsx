import React, { useContext, useEffect } from 'react';
import FormLoginComponent from "../components/FormLoginComponent/FormLoginComponent.jsx";
import { DashboardPage } from "./Dashboard.jsx";
import { AuthContext } from '../context/AuthUserContext';

export const IndexPage = () => {
  const { state, login } = useContext(AuthContext);

  useEffect(() => {
    const storedState = localStorage.getItem("authState");
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState.isAuthenticated) {
        login(parsedState.user.name, parsedState.user.email);
      }
    }
  }, [login]);

  return (
    <>
      {state.isAuthenticated ? (
        <DashboardPage />
      ) : (
        <>
          <title>Página Login</title>
          <FormLoginComponent />
        </>
      )}
    </>
  );
};

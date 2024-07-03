import React, { useEffect } from 'react';
import {FormLoginComponent} from "../components/FormLoginComponent/FormLoginComponent.jsx"
import { DashboardPage } from './Dashboard.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../context/AuthUserContext.jsx';

export const IndexPage = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const storedState = localStorage.getItem('auth');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState.isAuthenticated) {
        dispatch(loginUser({ name: parsedState.name, email: parsedState.email }));
      }
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated ? (
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

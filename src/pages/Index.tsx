import React, { useEffect } from 'react';
import { FormLoginComponent } from "../components/FormLoginComponent/FormLoginComponent";
import { DashboardPage } from './Dashboard/Dashboard';
import { useSelector, useDispatch } from 'react-redux';
import { login } from '../context/AuthUserContext';
import "../components/FormLoginComponent/FormLoginComponent.css";  

export const IndexPage: React.FC = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);  

  useEffect(() => {
    const storedState = localStorage.getItem('auth');
    if (storedState) {
      const parsedState = JSON.parse(storedState);
      if (parsedState.isAuthenticated) {
        dispatch(login({ name: parsedState.name, email: parsedState.email }));
      }
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated ? (
        <DashboardPage />
      ) : (
        <><div className='background'>
          <title>Página Login</title>
          <FormLoginComponent />
          </div>
        </>
      )}
    </>
  );
};

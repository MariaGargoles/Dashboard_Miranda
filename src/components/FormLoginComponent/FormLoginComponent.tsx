import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../context/AuthUserContext';
import "./FormLoginComponent.css";
import { LoginForm, TitleForm, Form, Label, Input, LogoForm, FormButton } from "./FormLoginStyled.js";

export const FormLoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // URL del backend (endpoint de AWS API Gateway)
  const API_URL = 'https://hh9omnddfj.execute-api.eu-west-3.amazonaws.com/dev/login';

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Llamada al backend
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Credenciales incorrectas');
        }
        throw new Error('Error al conectar con el servidor');
      }

      const data = await response.json();

      // Guardar token y usuario en LocalStorage
      localStorage.setItem('TOKEN_KEY', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      dispatch(login(data.user));

      // Limpiar mensaje de error
      setError('');
    } catch (err: any) {
      console.error('Error en el inicio de sesión:', err.message);
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  return (
    <LoginForm>
      <TitleForm>Login Page</TitleForm>
      <Form onSubmit={submitHandler}>
        <Label>Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <FormButton className="FormButton" type="submit" value="Login" />
      </Form>
    </LoginForm>
  );
};

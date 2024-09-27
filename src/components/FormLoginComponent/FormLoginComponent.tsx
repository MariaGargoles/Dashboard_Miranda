import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../context/AuthUserContext';
import "./FormLoginComponent.css";
import { LoginForm, TitleForm, Form, Label, Input, LogoForm } from "./FormLoginStyled.js";
import logo from "../../assets/Logo.png";
import { login as apiLogin } from "../../features/Connect API/ConnectApi";

export const FormLoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const user = await apiLogin({ email: username, password });
      dispatch(login(user));
      setError('');
    } catch (err: any) {
      setError('Datos de inicio de sesión incorrectos');
    }
  };

  return (
    <LoginForm>
      <TitleForm>LoginPage</TitleForm>
      <LogoForm src={logo} alt="Logo" />
      <Form onSubmit={submitHandler}>
        <Label>Nombre</Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <Label>Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <input className="FormButton" type="submit" value="Login" />
      </Form>
    </LoginForm>
  );
};

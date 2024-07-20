import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../context/AuthUserContext';
import "./FormLoginComponent.css";
import { LoginForm, TitleForm, Form, Label, Input, LogoForm } from "./FormLoginStyled.js";
import logo from "../../assets/Logo.png"

export const FormLoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  interface AuthState {
    foto: string;          
    name: string;
    id: string;
    startDate: string;
    description: string;
    email: string;
    contact: string;
    status: string;
    isAuthenticated: boolean;
  }

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (username === "maria" && password === "miranda") {
      dispatch(login({ name: username, email: "maria@example.com" }));
    } else {
      alert("Datos incorrectos");
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

        <input className="FormButton" type="submit" value="Login" />
      </Form>
    </LoginForm>
  );
};


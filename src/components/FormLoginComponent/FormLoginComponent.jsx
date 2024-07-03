import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthUserContext';
import "./FormLoginComponent.css";
import { LoginForm, TitleForm, Form, Label, Input, LogoForm } from "./FormLoginStyled.js";

const FormLoginComponent = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (event) => {
    event.preventDefault();

    if (username === "maria" && password === "miranda") {
      login(username, "maria@example.com");
    } else {
      alert("Datos incorrectos");
    }
  };

  return (
    <LoginForm>
      <TitleForm>LoginPage</TitleForm>
      <LogoForm src="/Logo.png" alt="Logo" />
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

export default FormLoginComponent;

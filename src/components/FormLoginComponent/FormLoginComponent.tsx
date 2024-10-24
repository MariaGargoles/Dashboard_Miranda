import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../context/AuthUserContext';
import "./FormLoginComponent.css";
import { LoginForm, TitleForm, Form, Label, Input, LogoForm, FormButton } from "./FormLoginStyled.js";
import { ApiConnect } from "../../features/Connect API/ConnectApi";

export const FormLoginComponent: React.FC = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
        const response = await ApiConnect('/login', 'POST', { email: username, password });
        
        
        localStorage.setItem('TOKEN_KEY', response.Token);
        
        
        localStorage.setItem('user', JSON.stringify(response.User));
        
        
        dispatch(login(response.User));

        setError('');
    } catch (err) {
        setError('Datos de inicio de sesión incorrectos');
    }
};

  return (
    <LoginForm>
      <TitleForm>LoginPage</TitleForm>
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
        <FormButton className="FormButton" type="submit" value="Login" />
      </Form>
    </LoginForm>
  );
};

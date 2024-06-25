import React from "react"
import "./FormLoginComponent.css"
import { LoginForm, TitleForm, Form, Label, Input, LogoForm } from "./FormLoginStyled.js"





export const FormLoginComponent = ({ onLogin }) => {
    const submitHandler = (event) => {
        event.preventDefault();
        let username = "maria";
        let password = "miranda";
        
        if (username === event.target.username.value && password === event.target.password.value) {
            localStorage.setItem("login", "true");
            onLogin(); 
        } else {
            alert("Datos incorrectos");
        }
    };

    return (
        <>
            <LoginForm>
                <TitleForm>LoginPage</TitleForm>
                <LogoForm img src="src/assets/Logo.png" alt="Logo" />
                <Form onSubmit={submitHandler}>
                    <Label htmlFor="username">Nombre</Label>
                    <Input type="text" id="username" name="username" placeholder="username" />

                    <Label htmlFor="password">Password</Label>
                    <Input type="password" id="password" name="password" placeholder="password" />

                    <input  className="FormButton" type="submit" />
                </Form>
            </LoginForm>
        </>
    );
};

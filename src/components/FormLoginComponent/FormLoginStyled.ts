import styled, { createGlobalStyle } from "styled-components";



// Estilo para el contenedor principal del formulario
export const LoginForm = styled.section`
  background-color: #f2f4f4;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  margin: auto;
  height: auto;
  margin-top: 3rem;
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
  position: relative;
  top: 52%;
  
  
`;

// Estilo para el logo
export const LogoForm = styled.img`
  margin: auto;
  width: 10rem;
  height: auto;
`;


// Estilo para el título del formulario
export const TitleForm = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  margin-bottom: 1.5rem;
  font-family: "Poppins", sans-serif;
  color: #333;
`;

// Estilo para el formulario en sí
export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

// Etiquetas de los campos
export const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #333;
  width: 70%;
  text-align: left;
  font-family: "Poppins", sans-serif;
`;

// Estilo para los inputs
export const Input = styled.input`
  width: 70%;
  padding: 0.8rem;
  margin-bottom: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  color: #333;

  &:focus {
    outline: none;
    border-color: #009688;
  }
`;


export const FormButton = styled.input`
  width: 70%;
  padding: 0.8rem;
  background-color: #F35E69;
  color: white;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  font-family: "Poppins", sans-serif;
  margin-top: 1rem;

  &:hover {
    background-color: #B82B47;
  }
`;

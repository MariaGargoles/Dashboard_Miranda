import styled from "styled-components";

interface ButtonProps {
  variant?: "default" | "save" | "close" | "erase"; 
}

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9;
`;

export const ModalCard = styled.div`
  background: white;
  display: flex;
  flex-direction: column;
  padding: 8rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
`;

export const Button = styled.button<ButtonProps>`
  background: ${(props) =>
    props.variant === "save"
      ? "#4CAF50"
      : props.variant === "close"
      ? "#f44336"
      : props.variant === "erase"
      ? "#FFC107"  
      : "#9e9e9e"};
  color: white;
  font-family: "Poppins", sans-serif;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  margin-top: 2rem;
  &:hover {
    opacity: 0.9;
  }
`;

export const ModalTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  background-color: #ffff;
`;

export const ModalLabel = styled.label`
  font-family: "Poppins", sans-serif;
  background-color: #ffff;
  padding: 1rem;
`;

export const ModalInput = styled.input`
  font-family: "Poppins", sans-serif;
  padding: 0.5rem;
`;
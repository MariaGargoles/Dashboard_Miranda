import styled from "styled-components";
import { ButtonHTMLAttributes } from "react";

interface UsersButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    status: "ACTIVE" | "INACTIVE"; 
  }
  

export const UsersButton = styled.button<UsersButtonProps>`
  padding: 0.5rem 1rem;
  margin-left: 1rem; 
  border: none;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  border-radius: 12px;
  background-color: ${(props) =>
    props.status === "ACTIVE" ? "#E8FFEE" : "#FFEDEC"};
  color: ${(props) => (props.status === "ACTIVE" ? "#5AD07A" : "#E23428")};
`;

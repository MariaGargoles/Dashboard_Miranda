import styled from "styled-components";

export const UsersButton = styled.button`
  padding: 0.5rem 1rem;
  margin-lef: 1rem;
  border: none;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  border-radius: 12px;
  background-color: ${(props) =>
    props.status === "ACTIVE" ? "#E8FFEE" : "#FFEDEC"};
  color: ${(props) => (props.status === "ACTIVE" ? "#5AD07A" : "#E23428")};
`;

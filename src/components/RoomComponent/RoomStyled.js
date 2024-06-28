import styled from "styled-components";
export const ImageRoom = styled.img`
  width: 5.5rem;
  height: 5.5rem;
  border-radius: 0.75rem;
`;

export const StatusButton = styled.button`
  background-color: ${(props) =>
    props.status === "Available" ? "#E8FFEE" : "#FFEDEC"};
  color: ${(props) => (props.status === "Available" ? "#5AD07A" : "#E23428")};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.3rem;
  cursor: ${(props) => (props.status === "Available" ? "pointer" : "default")};
  font-family: "Poppins", sans-serif;
  font-size: 1em;
`;

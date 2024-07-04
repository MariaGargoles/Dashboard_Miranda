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

export const ButtonRoom = styled.button`
  background-color: #135846;
  color: #ffffff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
`;

export const SelectorContainer = styled.div`
  display: inline-flex;
  width: 50%;
  ${(props) =>
    props.booking &&
    `
      margin-top: 3rem;
    `}
`;

export const Selector = styled.select`
  border: 1px solid #135846;
  border-radius: 12px;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  padding: 1rem;
  color: #135846;
`;

export const BookingButtonStatus = styled.button`
  padding: 0.5rem 1rem;
  margin-lef: 1rem;
  border: none;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  border-radius: 12px;

  ${(props) => {
    switch (props.styled) {
      case "Check In":
        return `
          background-color: #E8FFEE;
          color: #5AD07A;
          width: 6em;
        `;
      case "Check Out":
        return `
          background-color: #FFEDEC;
          color: #E23428;
          width: 6em;
        `;
      case "In Progress":
        return `
          background-color: #fcf3cf;
          color:  #f1c40f;
          width: 6em;
        `;
      default:
        return `
          background-color: #E2E2E2;
          color: #6D6D6D;
          width: 6em;
        `;
    }
  }}
`;

export const FormContainer = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #ffff;
  border-radius: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 40%;
  position: relative;
  form {
    background-color: #ffff;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const FormTitle = styled.h2`
  font-family: "Poppins", sans-serif;
  color: #135846;
  margin-bottom: 1rem;
  background-color: #ffff;
  padding-top: 2rem;
`;

export const FormLabel = styled.label`
  font-family: "Poppins", sans-serif;
  color: #135846;
  margin-top: 0.5rem;
  display: block;
  background-color: #ffff;
`;

export const FormInput = styled.input`
  border: 1px solid #135846;
  border-radius: 12px;
  padding: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  color: #135846;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #5ad07a;
    box-shadow: 0 0 0 2px rgba(90, 208, 122, 0.2);
  }
`;

export const FormSelect = styled.select`
  border: 1px solid #135846;
  border-radius: 12px;
  padding: 0.5rem;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  color: #135846;
  margin-bottom: 1rem;
  width: 100%;
  box-sizing: border-box;
  outline: none;

  &:focus {
    border-color: #5ad07a;
    box-shadow: 0 0 0 2px rgba(90, 208, 122, 0.2);
  }
`;

export const SubmitButton = styled.button`
  background-color: #135846;
  color: #ffffff;
  padding: 0.7rem 1.7rem;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #0d3a2f;
  }

  &:active {
    background-color: #0b2a1f;
  }
`;
export const BackButton = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 2rem;
  cursor: pointer;
  color: #135846;

  &:hover {
    color: #0f3e36;
  }
  svg {
    padding: 1rem;
    color: #e8ffee;
    background-color: #5ad07a;
    cursor: pointer;
    border-radius: 12px;
    position: absolute;
    left: 11%;
  }

  span {
    font-family: "Poppins", sans-serif;
    font-size: 1rem;
    font-weight: 500;
    background-color: #ffff;
    position: absolute;
    left: 18%;
  }
`;

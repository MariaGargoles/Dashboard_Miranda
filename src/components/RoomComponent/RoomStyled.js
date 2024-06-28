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

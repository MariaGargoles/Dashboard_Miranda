import styled from "styled-components";

interface ContactButtonProps {
  status: string;
}

export const TableContainer = styled.div`
  background-color: #f8f8f8;
  margin-left: 30rem;
  margin-right: 2rem;
`;

export const TableFilters = styled.ul`
  display: inline-flex;
  background-color: #f8f8f8;
  width: 25%;
  margin-top: 3rem;
  padding: 1rem;
`;

export const TableButtonFilter = styled.li`
  list-style: none;
  border: none;
  font-family: "Poppins", sans-serif;
  background-color: #f8f8f8;
  font-size: 1em;
  color: #135846;
  cursor: pointer;
  &:hover {
    border-bottom: 2px solid #135846;
  }
`;

export const Table = styled.table`
  background-color: #f8f8f8;
  padding: 2rem;
  border-radius: 18px;
`;

export const EncabezadoTabla = styled.thead`
  background-color: #ffff;
  font-family: "Poppins", sans-serif;
  text-align: justify;
`;

export const TableHeadText = styled.th`
  background-color: #ffff;
  font-family: "Poppins", sans-serif;
  padding: 1rem;
`;

export const BodyTable = styled.tbody`
  background-color: #f8f8f8;
  font-family: "Poppins", sans-serif;
`;

export const TableCell = styled.td`
  background-color: #ffff;
  font-family: "Poppins", sans-serif;
  padding: 1rem;
  margin: 1rem;
  border-radius: 18px;
  color: #393939;
`;

export const ContactButton = styled.button<ContactButtonProps>`
  background-color: ${(props) =>
    props.status === "publish" ? "#E8FFEE" : "#FFEDEC"};
  color: ${(props) => (props.status === "publish" ? "#5AD07A" : "#E23428")};
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
`;

export const PaginationContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  gap: 2em;
`;

export const PaginationButton = styled.button`
  background-color: #135846;
  color: #ffff;
  width: 7em;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 0.3rem;
  cursor: pointer;
  font-family: "Poppins", sans-serif;
  font-size: 1em;
  margin: 0 0.2rem;
  text-align: center;
`;

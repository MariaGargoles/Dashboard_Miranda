import data from "../../data/Booking.json"
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from "../ContactComponent/ContactStyled";
import { ImageRoom, StatusButton, SelectorContainer, ButtonRoom, Selector, BookingButtonStatus  } from "../RoomComponent/RoomStyled";
import { TableComponent } from "../TableComponent/TableComponent";
import { NavLink } from 'react-router-dom';


export const BookingComponent = () => {

    const columns = [
        { headerColumn: "Order ID", columnsData: "id" },
        { headerColumn: "Order Date", columnsData: "OrderDate" },
        { headerColumn: "Check-In Date", columnsData: "CheckIn" },
        { headerColumn: "Check-Out Date", columnsData: "CheckOut" },
        { headerColumn: "Special Request", columnsData: "SpecialRequest" },
        { headerColumn: "Room Type", columnsData: "RoomType" },
        { headerColumn: "Room Number", columnsData: "RoomNumber" },
        { headerColumn: "Status", columnsData: "Status", columnRenderer: (row) => (
            <BookingButtonStatus styled={row.Status}>
              {row.Status}
            </BookingButtonStatus>
          ),
        },
      ];
    
    

return (
    <>
        <TableContainer>
        <TableFilters></TableFilters>
            <SelectorContainer>
            <Selector>
            <option>All Bookings</option>
            <option>Checking In</option>
            <option>Checking Out</option>
            <option>In Progress</option>
            </Selector>
            </SelectorContainer>
            <NavLink to="NewBookin">
          <ButtonRoom>+ New Booking</ButtonRoom>
          </NavLink>
            <TableComponent columns={columns} data={data} />
        </TableContainer>
    </>
);
};
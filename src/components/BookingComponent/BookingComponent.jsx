import data from "./Booking.json"
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from "./ContactStyled";

export const BookingComponent = () => {

    const columns = [
        { headerColumn: 'Order ID', columnsData: 'id' },
        { headerColumn: 'Order Date', columnsData: 'OrderDate' },
        { headerColumn: 'Check-In Date', columnsData: 'CheckIn' },
        { headerColumn: 'Check-Out Date', columnsData: 'CheckOut' },
        { headerColumn: 'Special Request', columnsData: 'SpecialRequest' },
        { headerColumn: 'Room Type', columnsData: 'RoomType' },
        { headerColumn: 'Room Number', columnsData: 'RoomNumber' },
        { headerColumn: 'Status', columnsData: 'Status' }
      ];
      
}
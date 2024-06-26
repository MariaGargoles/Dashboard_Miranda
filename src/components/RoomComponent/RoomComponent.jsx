import data from "../../data/Rooms.json";
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from "../ContactComponent/ContactStyled";
import { TableComponent } from '../TableComponent/TableComponent';
import { ImageRoom, StatusButton, SelectorContainer, ButtonRoom, Selector,  } from "./RoomStyled";


export const RoomComponent = () => {
    const columns = [
        { headerColumn: 'Photo', columnsData: 'photo', columnRenderer: (row) => <ImageRoom src={row.photo} alt="Room Photo" /> },
        { headerColumn: 'Number', columnsData: 'number', columnsData: 'id', columnRenderer: (row) => `${row.number}  ${row.id}` },
        { headerColumn: 'Bed Type', columnsData: 'BedType' },
        { headerColumn: 'Amenities', columnsData: 'Amenities', columnRenderer: (row) => row.Amenities.join(', ') },
        { headerColumn: 'Rate', columnsData: 'Rate' },
        { headerColumn: 'Offer Price', columnsData: 'OfferPrice' },
        {headerColumn: 'Status', columnsData: 'Status', columnRenderer: (row) => <StatusButton status={row.Status}>{row.Status}</StatusButton> },
        { headerColumn: 'Room Floor', columnsData: 'RoomFloor' }
    ];

    return (
        <>
            <TableContainer>
                <TableFilters>
                    <TableButtonFilter>All Rooms</TableButtonFilter>
                    <TableButtonFilter>Available</TableButtonFilter>
                </TableFilters>
                <SelectorContainer>
                <ButtonRoom>+ New Room</ButtonRoom>
                <Selector>
                <option>Room Number</option>
                <option>Available</option>
                <option>Booked</option>
                <option>Price Highest to Lowest</option>
                <option>Price Lowest to Highest</option>
                </Selector>
                </SelectorContainer>
                <TableComponent columns={columns} data={data} />
            </TableContainer>
        </>
    );
};

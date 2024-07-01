import data from "../../data/Users.json"
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText, ContactButton } from "../ContactComponent/ContactStyled";
import { TableComponent } from '../TableComponent/TableComponent';
import { ImageRoom, StatusButton, SelectorContainer, ButtonRoom, Selector,  } from "../RoomComponent/RoomStyled";
import { UsersButton } from "./UsersStyled";

export const UserComponent = () => {
    const columns = [
        { headerColumn: 'Photo', columnsData: 'foto', columnRenderer: (row) => <img src={row.foto} alt="Employee" style={{ width: '50px', borderRadius: '50%' }} /> },
        { headerColumn: 'Name', columnsData: 'name' },
        { headerColumn: 'ID', columnsData: 'id' },
        { headerColumn: 'Start Date', columnsData: 'startDate' },
        { headerColumn: 'Description', columnsData: 'description' },
        { headerColumn: 'Email', columnsData: 'email' },
        { headerColumn: 'Contact', columnsData: 'contact' },
        { headerColumn: 'Status', columnsData: 'status', columnRenderer: (row) => <UsersButton status={row.status}>{row.status}</UsersButton> },
    ];
    
        return (
            <>
                <TableContainer>
                    <TableFilters>
                        <TableButtonFilter>All Employee</TableButtonFilter>
                        <TableButtonFilter>Active Employee </TableButtonFilter>
                        <TableButtonFilter>Inactive Employee </TableButtonFilter>
                    </TableFilters>
                    <SelectorContainer>
                        <ButtonRoom>+ New Employee</ButtonRoom>
                        <Selector>
                            <option>Fecha de alta</option>
                            
                        </Selector>
                    </SelectorContainer>
                    <TableComponent columns={columns} data={data} />
                </TableContainer>
            </>
        );
    };



import data from './ContactMessages.json';
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText, ContactButton } from "./ContactStyled";
import { TableComponent } from '../TableComponent/TableComponent';
import { ImageRoom, StatusButton, SelectorContainer, ButtonRoom, Selector,  } from "../RoomComponent/RoomStyled";

export const ContactMessagesComponent = () => {
    const columns = [
        { headerColumn: 'Order ID', columnsData: 'id' },
        { headerColumn: 'Date', columnsData: 'date' },
        { headerColumn: 'Name', columnsData: 'name' },
        { headerColumn: 'Email', columnsData: 'email' },
        { headerColumn: 'Subject', columnsData: 'subject' },
        { headerColumn: 'Comment', columnsData: 'comment' },
        { headerColumn: 'Action', columnsData: 'action', columnRenderer: (row) => <ContactButton status={row.action}>{row.action}</ContactButton>}
    ];

    return (
        <>
           <TableContainer>
                <TableFilters>
                    <TableButtonFilter>All Contacts</TableButtonFilter>
                    <TableButtonFilter>Published</TableButtonFilter>
                </TableFilters>
                <SelectorContainer>
                    <Selector>
                        <option>Newest</option>
                        <option>Oldest</option>
                    </Selector>
                </SelectorContainer>

                <TableComponent columns={columns} data={data} />
            </TableContainer>
        </>
    );
};


import data from './ContactMessages.json';
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText } from "./ContactStyled";
import { TableComponent } from '../TableComponent/TableComponent';

export const ContactMessagesComponent = () => {
    const columns = [
        { headerColumn: 'Order ID', columnsData: 'id' },
        { headerColumn: 'Date', columnsData: 'date' },
        { headerColumn: 'Name', columnsData: 'name' },
        { headerColumn: 'Email', columnsData: 'email' },
        { headerColumn: 'Subject', columnsData: 'subject' },
        { headerColumn: 'Comment', columnsData: 'comment' }
    ];

    return (
        <>
           <TableContainer>
                <TableFilters>
                    <TableButtonFilter>All Contacts</TableButtonFilter>
                    <TableButtonFilter>Published</TableButtonFilter>
                </TableFilters>
                <TableComponent columns={columns} data={data} />
            </TableContainer>
        </>
    );
};

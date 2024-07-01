import React, { useState } from 'react';
import data from "../../data/ContactMessages.json";
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText, ContactButton } from "./ContactStyled";
import { TableComponent } from '../TableComponent/TableComponent';
import { SelectorContainer, Selector } from "../RoomComponent/RoomStyled";

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

    const [contact, setContact] = useState(data);

    const filterActions = {
        all: () => setContact(data),
        archived: () => setContact(data.filter(contact => contact.action === 'archived')),
        published: () => setContact(data.filter(contact => contact.action === 'publish')),
    };
    const handleFilterClick = (action) => {
        filterActions[action]();
    };

    const handleDateSort = (order) => {
        const sortedData = [...contact].sort((a, b) => {
            const dateA = new Date(a.date.split('/').reverse().join('-'));
            const dateB = new Date(b.date.split('/').reverse().join('-'));
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
        setContact(sortedData);
    };


    return (
        <>
            <TableContainer>
                <TableFilters>
                    <TableButtonFilter onClick={() => handleFilterClick('all')}>All Contacts</TableButtonFilter>
                    <TableButtonFilter onClick={() => handleFilterClick('archived')}>Archived</TableButtonFilter>
                    <TableButtonFilter onClick={() => handleFilterClick('published')}>Published</TableButtonFilter>
                </TableFilters>
                <SelectorContainer>
                <Selector onChange={(e) => handleDateSort(e.target.value)}>
                        <option value="newest">Newest</option>
                        <option value="oldest">Oldest</option>
                    </Selector>
                </SelectorContainer>
                <TableComponent columns={columns} data={contact} />
            </TableContainer>
        </>
    );
};

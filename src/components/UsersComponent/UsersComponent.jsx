import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, updateUser } from "../../features/Users/UserSlice"; 
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText, ContactButton } from "../ContactComponent/ContactStyled";
import { TableComponent } from '../TableComponent/TableComponent';
import { ImageRoom, StatusButton, SelectorContainer, ButtonRoom, Selector } from "../RoomComponent/RoomStyled";
import { UsersButton } from "./UsersStyled";
import { UsersThunk } from '../../features/Users/UserThunk';

export const UserComponent = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.data);
    const status = useSelector((state) => state.users.status);

    const [currentFilter, setCurrentFilter] = useState('all');

    useEffect(() => {
        if (status === 'idle') {
            dispatch(UsersThunk());
        }
    }, [status, dispatch]);

    const handleFilterClick = (filter) => {
        setCurrentFilter(filter);
    };

    const filteredData = users.filter(user => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'active') return user.status === 'ACTIVE';
        if (currentFilter === 'inactive') return user.status === 'INACTIVE';
        return true;
    });

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
                    <TableButtonFilter onClick={() => handleFilterClick('all')}>All Employees</TableButtonFilter>
                    <TableButtonFilter onClick={() => handleFilterClick('active')}>Active Employees</TableButtonFilter>
                    <TableButtonFilter onClick={() => handleFilterClick('inactive')}>Inactive Employees</TableButtonFilter>
                </TableFilters>
                <SelectorContainer>
                    <ButtonRoom>+ New Employee</ButtonRoom>
                    <Selector>
                        <option>Sort by Start Date</option>
                    </Selector>
                </SelectorContainer>
                <TableComponent columns={columns} data={filteredData} />
            </TableContainer>
        </>
    );
};
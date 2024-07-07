import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, deleteUser, updateUser } from "../../features/Users/UserSlice"; 
import { TableContainer, TableFilters, TableButtonFilter, Table, EncabezadoTabla, BodyTable, TableCell, TableHeadText, ContactButton } from "../ContactComponent/ContactStyled";
import { TableComponent } from '../TableComponent/TableComponent';
import { ImageRoom, StatusButton, SelectorContainer, ButtonRoom, Selector, ActionContainer } from "../RoomComponent/RoomStyled";
import { UsersButton } from "./UsersStyled";
import { UsersThunk } from '../../features/Users/UserThunk';
import { TbEdit, TbTrash } from 'react-icons/tb';
import Swal from 'sweetalert2';


export const UserComponent = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.data);
    const status = useSelector((state) => state.users.status);

    const [currentFilter, setCurrentFilter] = useState('all');
    const [sortOrder, setSortOrder] = useState('asc');
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(UsersThunk());
        }
    }, [status, dispatch]);

    const handleFilterClick = (filter) => {
        setCurrentFilter(filter);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const filteredData = users.filter(user => {
        if (currentFilter === 'all') return true;
        if (currentFilter === 'active') return user.status === 'ACTIVE';
        if (currentFilter === 'inactive') return user.status === 'INACTIVE';
        return true;
    });

    const sortedData = filteredData.sort((a, b) => {
        const dateA = new Date(a.startDate.split('/').reverse().join('/'));
        const dateB = new Date(b.startDate.split('/').reverse().join('/'));

        if (sortOrder === 'asc') {
            return dateA - dateB;
        } else {
            return dateB - dateA;
        }
    });

    const handleEditUser = (user) => {
        setSelectedUser(user);  // Set the user to be edited
    };

    const handleDeleteUser = (userId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteUser(userId))
                    .then(() => {
                        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
                    })
                    .catch((error) => {
                        Swal.fire('Error!', 'There was an error deleting the user.', 'error');
                    });
            }
        });
    };

    const handleSaveUser = (user) => {
        dispatch(updateUser(user))
            .then(() => {
                Swal.fire('Updated!', 'The user has been updated.', 'success');
                setSelectedUser(null);  
            })
            .catch((error) => {
                Swal.fire('Error!', 'There was an error updating the user.', 'error');
            });
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const columns = [
        { headerColumn: 'Photo', columnsData: 'foto', columnRenderer: (row) => <img src={row.foto} alt="Employee" style={{ width: '50px', borderRadius: '50%' }} /> },
        { headerColumn: 'Name', columnsData: 'name' },
        { headerColumn: 'ID', columnsData: 'id' },
        { headerColumn: 'Start Date', columnsData: 'startDate' },
        { headerColumn: 'Description', columnsData: 'description' },
        { headerColumn: 'Email', columnsData: 'email' },
        { headerColumn: 'Contact', columnsData: 'contact' },
        { headerColumn: 'Status', columnsData: 'status', columnRenderer: (row) => <UsersButton status={row.status}>{row.status}</UsersButton> },
        {
            headerColumn: 'Actions',
            columnRenderer: (row) => (
                <ActionContainer>
                    <TbEdit title="Edit User" onClick={() => handleEditUser(row)} />
                    <TbTrash title="Delete User" onClick={() => handleDeleteUser(row.id)} />
                </ActionContainer>
            )
        },
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
                    <Selector onChange={handleSortChange} value={sortOrder}>
                        <option value="asc">Sort by Start Date (Ascending)</option>
                        <option value="desc">Sort by Start Date (Descending)</option>
                    </Selector>
                </SelectorContainer>
                <TableComponent columns={columns} data={sortedData} />
            </TableContainer>
            {selectedUser && (
                <EditUserModal
                    user={selectedUser}
                    onSave={handleSaveUser}
                    onCancel={handleCloseModal}
                />
            )}
        </>
    );
};
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from "../../app/store"; 
import {  deleteUser, updateUser } from "../../features/Users/UserSlice"; 
import { SelectorContainer, ButtonRoom, Selector, ActionContainer } from "../RoomComponent/RoomStyled";
import {
    TableContainer,
    TableFilters,
    TableButtonFilter,
} from '../ContactComponent/ContactStyled';
import { UsersButton } from "./UsersStyled";
import { fetchUsersListThunk, deleteUserThunk } from "../../features/Users/UserThunk"; 
import { TbEdit, TbTrash } from 'react-icons/tb';
import Swal from 'sweetalert2';
import { EditUserModal } from '../PopUpEditUserComponent/PopUpEditUser';
import { TableComponent } from '../TableComponent/TableComponent';
import { User, ColumnType } from '../../types/global';

interface UserComponentState {
  currentFilter: 'all' | 'active' | 'inactive';
  sortOrder: 'asc' | 'desc';
  selectedUser: User | null;
}

export const UserComponent: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users.data);
    const status = useSelector((state: RootState) => state.users.status);
    const error = useSelector((state: RootState) => state.users.error);

    const [currentFilter, setCurrentFilter] = useState<'all' | 'active' | 'inactive'>('all');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchUsersListThunk());
        } else if (status === 'rejected' && error) {
            Swal.fire('Error!', `Failed to fetch users: ${error}`, 'error');
        }
    }, [status, dispatch, error]);

    const handleFilterClick = (filter: 'all' | 'active' | 'inactive') => {
        setCurrentFilter(filter);
    };

    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortOrder(e.target.value as 'asc' | 'desc');
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
            return dateA.getTime() - dateB.getTime();
        } else {
            return dateB.getTime() - dateA.getTime();
        }
    });

    const handleEditUser = (user: User) => {
        setSelectedUser(user); 
    };

    const handleDeleteUser = (userId: string) => {
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
                dispatch(deleteUserThunk(userId));
            }
        });
    };

    const handleSaveUser = (user: User) => {
        dispatch(updateUser(user));
    };

    const handleCloseModal = () => {
        setSelectedUser(null);
    };

    const columns: ColumnType<User>[] = [
        { headerColumn: 'Photo', columnsData: 'foto', columnRenderer: (row: User) => <img src={row.foto} alt="Employee" style={{ width: '50px', borderRadius: '50%' }} /> },
        { headerColumn: 'Name', columnsData: 'name' },
        { headerColumn: 'ID', columnsData: 'id' },
        { headerColumn: 'Start Date', columnsData: 'startDate' },
        { headerColumn: 'Description', columnsData: 'description' },
        { headerColumn: 'Email', columnsData: 'email' },
        { headerColumn: 'Contact', columnsData: 'contact' },
        { headerColumn: 'Status', columnsData: 'status', columnRenderer: (row: User) => <UsersButton status={row.status}>{row.status}</UsersButton> },
        {
            headerColumn: 'Actions',
            columnsData: 'id', 
            columnRenderer: (row: User) => (
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
                    <ButtonRoom onClick={() => setSelectedUser({} as User)}>+ New Employee</ButtonRoom>
                    <Selector onChange={handleSortChange} value={sortOrder}>
                        <option value="asc">Sort by Start Date (Ascending)</option>
                        <option value="desc">Sort by Start Date (Descending)</option>
                    </Selector>
                </SelectorContainer>
                <TableComponent<User> columns={columns} data={sortedData} />
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
const mapStatus = (status: string): "ACTIVE" | "INACTIVE" => {
    switch (status) {
      case "ACTIVE":
      case "INACTIVE":
        return status;
      default:
        return "INACTIVE"; 
    }
  };

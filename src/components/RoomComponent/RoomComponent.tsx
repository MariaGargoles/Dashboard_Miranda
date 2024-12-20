import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRoomsListThunk, deleteRoomThunk } from '../../features/Room/RoomThunk';
import { Room, ColumnType } from '../../types/global';
import { TableComponent } from "../TableComponent/TableComponent";
import { ImageRoom, StatusButton, ButtonRoom, SelectorContainer, Selector, ActionContainer } from './RoomStyled';
import { NavLink } from 'react-router-dom';
import { TbEdit, TbTrash } from 'react-icons/tb';
import Swal from 'sweetalert2';
import {
  TableContainer,
  TableFilters,
  TableButtonFilter,
} from '../ContactComponent/ContactStyled';
import { EditRoomModal } from '../PopUpEditRoom/PopUpEditRoom'; 
import { RootState, AppDispatch } from '../../app/store';

export const RoomComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const roomList = useSelector((state: RootState) => state.room.data as unknown as Room[]);
  const roomStatus = useSelector((state: RootState) => state.room.status);
  const roomError = useSelector((state: RootState) => state.room.error);
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (roomStatus === 'idle') {
      dispatch(fetchRoomsListThunk());
    } else if (roomStatus === 'fulfilled') {
      setFilteredRooms(roomList);
    } else if (roomStatus === 'rejected' && roomError) {
      alert('Error: ' + roomError);
    }
  }, [roomStatus, dispatch, roomError, roomList]);

  const columns: ColumnType<Room>[] = [
    {
      headerColumn: 'Photo',
      columnsData: 'photo',
      columnRenderer: (row: Room) => <ImageRoom src={row.photo} alt="Room Photo" />
    },
    { headerColumn: 'Number', columnsData: 'number' },
    { 
      headerColumn: 'Bed Type', 
      columnsData: 'bedType',
      columnRenderer: (row: Room) => (
        row.bedType ? <span>{row.bedType}</span> : <span>No bed type</span>
      )
    },
    {
      headerColumn: 'Amenities',
      columnsData: 'amenities',  
      columnRenderer: (row: Room) => (
        row.amenities && row.amenities.length > 0 
        ? <span>{row.amenities.join(', ')}</span>  
        : <span>No amenities listed</span> 
      )
    },
    {
      headerColumn: 'Rate',
      columnsData: 'rate',
      columnRenderer: (row: Room) => (
        row.rate ? <span>${row.rate}</span> : <span>N/A</span>
      )
    },
    {
      headerColumn: 'Offer Price',
      columnsData: 'offerPrice',
      columnRenderer: (row: Room) => (
        row.offerPrice ? <span>${row.offerPrice}</span> : <span>N/A</span>
      )
    },
    {
      headerColumn: 'Status',
      columnsData: 'status',
      columnRenderer: (row: Room) => (
        <StatusButton status={row.status === 'Available' ? 'Available' : 'Unavailable'}>
          {row.status === 'Available' ? 'Available' : 'Unavailable'}
        </StatusButton>
      )
    },
    {
      headerColumn: 'Actions',
      columnsData: 'id',
      columnRenderer: (row: Room) => (
        <ActionContainer>
          <TbEdit title="Edit Room" onClick={() => handleEditRoom(row)} />
          <TbTrash title="Delete Room" onClick={() => handleDeleteRoom(row._id)} />
        </ActionContainer>
      )
    }
  ];

  const handleEditRoom = (room: Room) => {
    setSelectedRoom(room);
    setEditModalOpen(true);
  };

  const handleDeleteRoom = (roomId: string) => {
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
        dispatch(deleteRoomThunk(roomId)).then(() => {
          Swal.fire('Deleted!', 'Your room has been deleted.', 'success');
        }).catch(() => {
          Swal.fire('Error!', 'There was an error deleting the room.', 'error');
        });
      }
    });
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <TableContainer>
      <TableFilters>
        <TableButtonFilter onClick={() => setFilteredRooms(roomList)}>All Rooms</TableButtonFilter>
        <TableButtonFilter onClick={() => setFilteredRooms(roomList.filter(room => room.status === 'Available'))}>Available</TableButtonFilter>
        <TableButtonFilter onClick={() => setFilteredRooms(roomList.filter(room => room.status === 'Booked'))}>Booked</TableButtonFilter>
      </TableFilters>
      <NavLink to="NewRoom">
        <ButtonRoom>+ New Room</ButtonRoom>
      </NavLink>
      <TableComponent columns={columns} data={filteredRooms} />
      {isEditModalOpen && selectedRoom && (
        <EditRoomModal room={selectedRoom} onClose={handleCloseModal} />
      )}
    </TableContainer>
  );
};

const mapStatus = (status: string): "Available" | "Unavailable" => {
  switch (status) {
    case "Available":
    case "Unavailable":
      return status;
    default:
      return "Unavailable"; 
  }
};

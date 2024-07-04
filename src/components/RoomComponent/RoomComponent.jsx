import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoomsThunk } from '../../features/Room/RoomThunk';
import { deleteRoom, updateRoom } from '../../features/Room/RoomSlice';
import {TableComponent} from "../TableComponent/TableComponent"
import { ImageRoom, StatusButton, ButtonRoom, SelectorContainer, Selector, ActionContainer } from './RoomStyled';
import { NavLink } from 'react-router-dom';
import { TbEdit, TbTrash } from 'react-icons/tb';
import Swal from 'sweetalert2';
import {
    TableContainer,
    TableFilters,
    TableButtonFilter,
  } from '../ContactComponent/ContactStyled';
import { UpdateRoom as UpdateRoomModal } from '../PopUpEditRoom/PopUpEditRoom';

export const RoomComponent = () => {
  const dispatch = useDispatch();
  const roomList = useSelector((state) => state.room.data);
  const roomStatus = useSelector((state) => state.room.status);
  const roomError = useSelector((state) => state.room.error);
  const [sortOption, setSortOption] = useState('');
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    if (roomStatus === 'idle') {
      dispatch(RoomsThunk());
    } else if (roomStatus === 'fulfilled') {
      setFilteredRooms(roomList);
    } else if (roomStatus === 'rejected') {
      alert('Error: ' + roomError);
    }
  }, [roomStatus, dispatch, roomError, roomList]);

  useEffect(() => {
    setFilteredRooms(roomList);
  }, [roomList]);

  const columns = [
    {
      headerColumn: 'Photo',
      columnsData: 'photo',
      columnRenderer: (row) => <ImageRoom src={row.photo} alt="Room Photo" />
    },
    { headerColumn: 'Number', columnsData: 'number' },
    { headerColumn: 'Bed Type', columnsData: 'BedType' },
    {
      headerColumn: 'Amenities',
      columnsData: 'Amenities',
      columnRenderer: (row) => row.Amenities.join(', ')
    },
    { headerColumn: 'Rate', columnsData: 'Rate' },
    { headerColumn: 'Offer Price', columnsData: 'OfferPrice' },
    {
      headerColumn: 'Status',
      columnsData: 'Status',
      columnRenderer: (row) => <StatusButton status={row.Status}>{row.Status}</StatusButton>
    },
    { headerColumn: 'Room Floor', columnsData: 'RoomFloor' },
    {
      headerColumn: 'Actions',
      columnRenderer: (row) => (
        <ActionContainer>
          <TbEdit title="Edit Room" onClick={() => handleEditRoom(row)} />
          <TbTrash title="Delete Room" onClick={() => handleDeleteRoom(row.id)} />
        </ActionContainer>
      )
    }
  ];

  const filterActions = {
    all: () => setFilteredRooms(roomList),
    available: () => setFilteredRooms(roomList.filter((room) => room.Status === 'Available')),
    booked: () => setFilteredRooms(roomList.filter((room) => room.Status === 'Booked'))
  };

  const handleFilterClick = (action) => {
    filterActions[action]();
  };

  const handleSortChange = (event) => {
    const sortValue = event.target.value;
    setSortOption(sortValue);
    const sortedData = [...filteredRooms].sort((a, b) => {
      switch (sortValue) {
        case 'roomNumberAsc':
          return a.number.localeCompare(b.number);
        case 'roomNumberDesc':
          return b.number.localeCompare(a.number);
        case 'priceHighLow':
          return b.OfferPrice - a.OfferPrice;
        case 'priceLowHigh':
          return a.OfferPrice - b.OfferPrice;
        default:
          return 0;
      }
    });
    setFilteredRooms(sortedData);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedRoom(null);
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setEditModalOpen(true);
  };

  const handleDeleteRoom = (roomId) => {
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
        dispatch(deleteRoom(roomId))
          .then(() => {
            Swal.fire('Deleted!', 'Your room has been deleted.', 'success');
          })
          .catch((error) => {
            Swal.fire('Error!', 'There was an error deleting the room.', 'error');
          });
      }
    });
  };

  return (
    <TableContainer>
      <TableFilters>
        <TableButtonFilter onClick={() => handleFilterClick('all')}>All Rooms</TableButtonFilter>
        <TableButtonFilter onClick={() => handleFilterClick('available')}>Available</TableButtonFilter>
        <TableButtonFilter onClick={() => handleFilterClick('booked')}>Booked</TableButtonFilter>
      </TableFilters>
      <SelectorContainer>
        <NavLink to="NewRoom">
          <ButtonRoom>+ New Room</ButtonRoom>
        </NavLink>
        <Selector value={sortOption} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="roomNumberAsc">Room Number Ascending</option>
          <option value="roomNumberDesc">Room Number Descending</option>
          <option value="priceLowHigh">Price Lowest to Highest</option>
          <option value="priceHighLow">Price Highest to Lowest</option>
        </Selector>
      </SelectorContainer>
      <TableComponent columns={columns} data={filteredRooms} />
    
      {isEditModalOpen && (
        <UpdateRoomModal room={selectedRoom} onClose={handleCloseModal} /> 
      )}
    </TableContainer>
  );
};

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RoomsThunk } from '../../features/Room/RoomThunk';
import { deleteRoom, updateRoom } from '../../features/Room/RoomSlice';
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
import {  EditRoomModal } from '../PopUpEditRoom/PopUpEditRoom';
import { RootState, AppDispatch } from '../../app/store';
import { Room, ColumnType } from '../../types/global';


export const RoomComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const roomList = useSelector((state: RootState) => state.room.data as unknown as Room[]);
  const roomStatus = useSelector((state: RootState) => state.room.status);
  const roomError = useSelector((state: RootState) => state.room.error);
  const [sortOption, setSortOption] = useState('');
  const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);

  useEffect(() => {
    if (roomStatus === 'idle') {
      dispatch(RoomsThunk());
    } else if (roomStatus === 'fulfilled') {
      setFilteredRooms(roomList);
    } else if (roomStatus === 'rejected' && roomError) {
      alert('Error: ' + roomError);
    }
  }, [roomStatus, dispatch, roomError, roomList]);

  useEffect(() => {
    setFilteredRooms(roomList);
  }, [roomList]);

  const columns: ColumnType<Room>[] = [
    {
      headerColumn: 'Photo',
      columnsData: 'photo',
      columnRenderer: (row: Room) => <ImageRoom src={row.photo} alt="Room Photo" />
    },
    { headerColumn: 'Number', columnsData: 'number' },
    { headerColumn: 'Bed Type', columnsData: 'BedType' },
    {
      headerColumn: 'Amenities',
      columnsData: 'Amenities',
      columnRenderer: (row: Room) => <span>{row.Amenities.join(', ')}</span> 
    },
    { headerColumn: 'Rate', columnsData: 'Rate' },
    { headerColumn: 'Offer Price', columnsData: 'OfferPrice' },
    {
      headerColumn: 'Status',
      columnsData: 'Status',
      columnRenderer: (row: Room) => <StatusButton status={mapStatus(row.Status)}>{mapStatus(row.Status)}</StatusButton>
    },
    { headerColumn: 'Room Floor', columnsData: 'RoomFloor' },
    {
      headerColumn: 'Actions',
      columnsData: 'id',
      columnRenderer: (row: Room) => (
        <ActionContainer>
          <TbEdit title="Edit Room" onClick={() => handleEditRoom(row)} />
          <TbTrash title="Delete Room" onClick={() => handleDeleteRoom(row.id)} />
        </ActionContainer>
      )
    }
  ];

  const filterActions = {
    all: () => setFilteredRooms(roomList),
    available: () => setFilteredRooms(roomList.filter((room) => mapStatus(room.Status) === 'Available')),
    booked: () => setFilteredRooms(roomList.filter((room) => mapStatus(room.Status) === 'Unavailable'))
  };

  const handleFilterClick = (action: 'all' | 'available' | 'booked') => {
    filterActions[action]();
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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
        dispatch(deleteRoom(roomId));
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

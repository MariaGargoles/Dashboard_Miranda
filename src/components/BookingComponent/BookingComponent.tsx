import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsListThunk, deleteBookingThunk } from '../../features/Booking/BookinThunk';
import { Booking, ColumnType } from '../../types/global';
import { TableComponent } from '../TableComponent/TableComponent';
import { NavLink } from 'react-router-dom';
import { TbEdit, TbTrash } from 'react-icons/tb';
import Swal from 'sweetalert2';
import {
  TableContainer,
  TableFilters,
  TableButtonFilter,
} from '../ContactComponent/ContactStyled';
import {
  SelectorContainer,
  ButtonRoom,
  Selector,
  BookingButtonStatus,
  ActionContainer
} from '../RoomComponent/RoomStyled';
import { UpdateBookingModal } from "../PopUpEditBookinComponent/PopUpEditBookin";

import { RootState, AppDispatch } from '../../app/store';

export const BookingComponent: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const bookingList = useSelector((state: RootState) => state.bookin.data as Booking[]);
  const bookingStatus = useSelector((state: RootState) => state.bookin.status);
  const bookingError = useSelector((state: RootState) => state.bookin.error);

  const [currentFilter, setCurrentFilter] = useState<'all' | 'available' | 'booked' | 'inProgress'>('all');
  const [isEditModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (bookingStatus === 'idle') {
      dispatch(fetchBookingsListThunk());
    } else if (bookingStatus === 'rejected') {
      alert('Error: ' + bookingError);
    }
  }, [bookingStatus, dispatch, bookingError]);

  const handleFilterClick = (filter: 'all' | 'available' | 'booked' | 'inProgress') => {
    setCurrentFilter(filter);
  };

  const handleEditBooking = (booking: Booking) => {
    setSelectedBooking(booking);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (id: string) => {
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
        dispatch(deleteBookingThunk(id)).then(() => {
          Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
        }).catch(() => {
          Swal.fire('Error!', 'There was an error deleting the booking.', 'error');
        });
      }
    });
  };

  const filteredBookingList = bookingList.filter((booking) => {
    if (currentFilter === 'all') return true;
    if (currentFilter === 'available') return booking.Status === 'Check In';
    if (currentFilter === 'booked') return booking.Status === 'Check Out';
    if (currentFilter === 'inProgress') return booking.Status === 'In Progress';
    return true;
  });

  const columns: ColumnType<Booking>[] = [
    { headerColumn: "Order ID", columnsData: "_id" as keyof Booking },
    { headerColumn: "Name", columnsData: "Name" as keyof Booking },
    { headerColumn: "Order Date", columnsData: "OrderDate" as keyof Booking },
    { headerColumn: "Check-In Date", columnsData: "CheckIn" as keyof Booking },
    { headerColumn: "Check-Out Date", columnsData: "CheckOut" as keyof Booking },
    { headerColumn: "Special Request", columnsData: "SpecialRequest" as keyof Booking },
    { headerColumn: "Room Type", columnsData: "RoomType" as keyof Booking },
    { headerColumn: "Room Number", columnsData: "RoomNumber" as keyof Booking },
    {
      headerColumn: "Status", 
      columnsData: "Status" as keyof Booking, 
      columnRenderer: (row: Booking) => (
        <BookingButtonStatus styled={row.Status}>
          {row.Status}
        </BookingButtonStatus>
      ),
    },
    {
      headerColumn: 'Actions',
      columnsData: '_id', 
      columnRenderer: (row: Booking) => (
        <ActionContainer>
          <TbEdit title="Edit Booking" onClick={() => handleEditBooking(row)} />
          <TbTrash title="Delete Booking" onClick={() => handleDeleteBooking(row._id)} />
        </ActionContainer>
      )
    }
  ];

  return (
    <>
      <TableContainer>
        <TableFilters>
          <TableButtonFilter onClick={() => handleFilterClick('all')}>All Booking</TableButtonFilter>
          <TableButtonFilter onClick={() => handleFilterClick('available')}>Check In</TableButtonFilter>
          <TableButtonFilter onClick={() => handleFilterClick('booked')}>Check Out</TableButtonFilter>
          <TableButtonFilter onClick={() => handleFilterClick('inProgress')}>In Progress</TableButtonFilter>
        </TableFilters>
        <SelectorContainer>
          <Selector onChange={(e) => handleFilterClick(e.target.value as 'all' | 'available' | 'booked' | 'inProgress')}>
            <option value="all">All Bookings</option>
            <option value="available">Check In</option>
            <option value="booked">Check Out</option>
            <option value="inProgress">In Progress</option>
          </Selector>
        </SelectorContainer>
        <NavLink to="NewBookin">
          <ButtonRoom>+ New Booking</ButtonRoom>
        </NavLink>
        <TableComponent<Booking> columns={columns} data={filteredBookingList} />

        {isEditModalOpen && selectedBooking && (
          <UpdateBookingModal booking={selectedBooking} onClose={handleCloseModal} />
        )}
      </TableContainer>
    </>
  );
};

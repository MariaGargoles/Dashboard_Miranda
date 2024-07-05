import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BookinThunk } from '../../features/Booking/BookinThunk';
import { deleteBookin, updateBookin } from '../../features/Booking/BookinSlice';
import { TableComponent } from '../TableComponent/TableComponent';
import { NavLink } from 'react-router-dom';
import { TbEdit, TbTrash } from 'react-icons/tb';
import Swal from 'sweetalert2';
import {
  TableContainer,
  TableFilters,
  TableButtonFilter,
  Table,
  EncabezadoTabla,
  BodyTable,
  TableCell,
  TableHeadText
} from '../ContactComponent/ContactStyled';
import {
  ImageRoom,
  StatusButton,
  SelectorContainer,
  ButtonRoom,
  Selector,
  BookingButtonStatus,
  ActionContainer
} from '../RoomComponent/RoomStyled';


export const BookingComponent = () => {
  const dispatch = useDispatch();
  const bookingList = useSelector((state) => state.bookin.data);
  const bookingStatus = useSelector((state) => state.bookin.status);
  const bookingError = useSelector((state) => state.bookin.error);

  const [currentFilter, setCurrentFilter] = useState('all');
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (bookingStatus === 'idle') {
      dispatch(BookinThunk());
    } else if (bookingStatus === 'rejected') {
      alert('Error: ' + bookingError);
    }
  }, [bookingStatus, dispatch, bookingError]);

  const handleFilterClick = (filter) => {
    setCurrentFilter(filter);
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setEditModalOpen(true);
  };

  const handleCloseModal = () => {
    setEditModalOpen(false);
    setSelectedBooking(null);
  };

  const handleDeleteBooking = (id) => {
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
        dispatch(deleteBookin(id))
          .then(() => {
            Swal.fire('Deleted!', 'Your booking has been deleted.', 'success');
          })
          .catch(() => {
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

  const columns = [
    { headerColumn: "Order ID", columnsData: "id" },
    { headerColumn: "Order Date", columnsData: "OrderDate" },
    { headerColumn: "Check-In Date", columnsData: "CheckIn" },
    { headerColumn: "Check-Out Date", columnsData: "CheckOut" },
    { headerColumn: "Special Request", columnsData: "SpecialRequest" },
    { headerColumn: "Room Type", columnsData: "RoomType" },
    { headerColumn: "Room Number", columnsData: "RoomNumber" },
    {
      headerColumn: "Status", columnsData: "Status", columnRenderer: (row) => (
        <BookingButtonStatus styled={row.Status}>
          {row.Status}
        </BookingButtonStatus>
      ),
    },
    {
      headerColumn: 'Actions',
      columnRenderer: (row) => (
        <ActionContainer>
          <TbEdit title="Edit Booking" onClick={() => handleEditBooking(row)} />
          <TbTrash title="Delete Booking" onClick={() => handleDeleteBooking(row.id)} />
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
          <Selector onChange={(e) => handleFilterClick(e.target.value)}>
            <option value="all">All Bookings</option>
            <option value="available">Check In</option>
            <option value="booked">Check Out</option>
            <option value="inProgress">In Progress</option>
          </Selector>
        </SelectorContainer>
        <NavLink to="NewBookin">
          <ButtonRoom>+ New Booking</ButtonRoom>
        </NavLink>
        <TableComponent columns={columns} data={filteredBookingList} />

        {isEditModalOpen && (
          <UpdateBookingModal booking={selectedBooking} onClose={handleCloseModal} />
        )}
      </TableContainer>
    </>
  );
};

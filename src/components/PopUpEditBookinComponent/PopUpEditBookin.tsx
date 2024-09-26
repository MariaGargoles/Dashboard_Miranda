import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateBookin } from '../../features/Booking/BookinSlice';
import Swal from 'sweetalert2';
import { Modal, ModalCard } from '../PopUpUserComponent/PopUpUserStyled';
import {
  FormTitle,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  BackButton,
} from '../RoomComponent/RoomStyled';
import { unwrapResult } from '@reduxjs/toolkit';
import { Booking } from '../../types/global';

  
  interface UpdateBookingModalProps {
    booking: Booking;
    onClose: () => void;
  }
  
  export const UpdateBookingModal: React.FC<UpdateBookingModalProps> = ({ booking, onClose }) => {
    const [formData, setFormData] = useState<Booking>({ ...booking });
    const dispatch = useDispatch();
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const resultAction = await dispatch(updateBookin(formData));
        unwrapResult(resultAction);
        Swal.fire('Success', 'Booking updated successfully', 'success');
        onClose();
      } catch (error) {
        Swal.fire('Error', 'There was an error updating the booking', 'error');
      }
    };
  
    return (
      <Modal onClick={onClose}>
        <ModalCard onClick={(e) => e.stopPropagation()}>
          <FormTitle>Edit Booking</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormLabel>Name:</FormLabel>
            <FormInput
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
            />
  
            <FormLabel>Order Date:</FormLabel>
            <FormInput
              type="date"
              name="OrderDate"
              value={formData.OrderDate}
              onChange={handleChange}
            />
  
            <FormLabel>Check-In Date:</FormLabel>
            <FormInput
              type="date"
              name="CheckIn"
              value={formData.CheckIn}
              onChange={handleChange}
            />
  
            <FormLabel>Check-Out Date:</FormLabel>
            <FormInput
              type="date"
              name="CheckOut"
              value={formData.CheckOut}
              onChange={handleChange}
            />
  
            <FormLabel>Special Request:</FormLabel>
            <FormInput
              type="text"
              name="SpecialRequest"
              value={formData.SpecialRequest}
              onChange={handleChange}
            />
  
            <FormLabel>Room Type:</FormLabel>
            <FormSelect
              name="RoomType"
              value={formData.RoomType}
              onChange={handleChange}
            >
              <option value="Single Bed">Single Bed</option>
              <option value="Double Bed">Double Bed</option>
              <option value="Double Superior">Double Superior</option>
              <option value="Suite">Suite</option>
            </FormSelect>
  
            <FormLabel>Room Number:</FormLabel>
            <FormInput
              type="text"
              name="RoomNumber"
              value={formData.RoomNumber}
              onChange={handleChange}
            />
  
            <FormLabel>Status:</FormLabel>
            <FormSelect name="Status" value={formData.Status} onChange={handleChange}>
              <option value="Check In">Check In</option>
              <option value="Check Out">Check Out</option>
              <option value="In Progress">In Progress</option>
            </FormSelect>
  
            <SubmitButton type="submit">Save</SubmitButton>
            <BackButton  onClick={onClose}>Cancel</BackButton>
          </form>
        </ModalCard>
      </Modal>
    );
  };
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addBookin } from '../../features/Booking/BookinSlice';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
  FormTitle,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  BackButton
} from '../RoomComponent/RoomStyled';

export const NewBookin = () => {
  const [formData, setFormData] = useState({
    Name: '',
    OrderDate: '',
    CheckIn: '',
    CheckOut: '',
    SpecialRequest: '',
    bedType: '',
    RoomNumber: '',
    Status: 'In Progress'
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addBookin(formData))
      .then(() => {
        Swal.fire('Success', 'Booking added successfully', 'success');
        navigate(-1); // Volver a la página anterior
      })
      .catch(() => {
        Swal.fire('Error', 'There was an error adding the booking', 'error');
      });
  };

  const handleCancel = () => {
    navigate(-1); // Volver a la página anterior
  };

  return (
    <div>
      <FormTitle>Add Booking</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormLabel>
          Name:
        </FormLabel>
        <FormInput
          type="text"
          name="Name"
          value={formData.Name}
          onChange={handleChange}
        />
        
        <FormLabel>
          Order Date:
        </FormLabel>
        <FormInput
          type="date"
          name="OrderDate"
          value={formData.OrderDate}
          onChange={handleChange}
        />
        
        <FormLabel>
          Check-In Date:
        </FormLabel>
        <FormInput
          type="date"
          name="CheckIn"
          value={formData.CheckIn}
          onChange={handleChange}
        />
        
        <FormLabel>
          Check-Out Date:
        </FormLabel>
        <FormInput
          type="date"
          name="CheckOut"
          value={formData.CheckOut}
          onChange={handleChange}
        />
        
        <FormLabel>
          Special Request:
        </FormLabel>
        <FormInput
          type="text"
          name="SpecialRequest"
          value={formData.SpecialRequest}
          onChange={handleChange}
        />
        
        <FormSelect
          name="bedType"
          value={formData.bedType}
          onChange={handleChange}
        >
          <option value="">Select Bed Type</option>
          <option value="Single Bed">Single Bed</option>
          <option value="Double Bed">Double Bed</option>
          <option value="Double Superior">Double Superior</option>
          <option value="Suite">Suite</option>
        </FormSelect>
        
        <FormLabel>
          Room Number:
        </FormLabel>
        <FormInput
          type="text"
          name="RoomNumber"
          value={formData.RoomNumber}
          onChange={handleChange}
        />
        
        <FormLabel>
          Status:
        </FormLabel>
        <FormSelect name="Status" value={formData.Status} onChange={handleChange}>
          <option value="Check In">Check In</option>
          <option value="Check Out">Check Out</option>
          <option value="In Progress">In Progress</option>
        </FormSelect>
        
        <SubmitButton type="submit">Save</SubmitButton>
        <BackButton type="button" onClick={handleCancel}>Cancel</BackButton>
      </form>
    </div>
  );
};

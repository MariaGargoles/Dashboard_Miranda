import React, { useState, ChangeEvent, FormEvent } from 'react';
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
import { TbArrowBigLeftLines } from 'react-icons/tb';



interface FormData {
    id: string;
  Name: string;
  OrderDate: string;
  CheckIn: string;
  CheckOut: string;
  SpecialRequest: string;
  RoomType: string;
  RoomNumber: string;
  Status: 'Check In' | 'Check Out' | 'In Progress';
}

export const NewBookin: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    id: '', 
    Name: '',
    OrderDate: '',
    CheckIn: '',
    CheckOut: '',
    SpecialRequest: '',
    RoomType: '',
    RoomNumber: '',
    Status: 'In Progress'
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(addBookin(formData));
  };

  const handleCancel = () => {
    navigate(-1); 
  };

  return (
    <div>
      <BackButton onClick={handleCancel}>
        <TbArrowBigLeftLines />
        <span>Back to Bookings</span>
      </BackButton>
      <FormTitle>Add Booking</FormTitle>
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

        <FormLabel>Bed Type:</FormLabel>
        <FormSelect
          name="bedType"
          value={formData.RoomType}
          onChange={handleChange}
        >
          <option value="">Select Bed Type</option>
          <option value="Single">Single</option>
          <option value="Double">Double</option>
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
        <FormSelect
          name="Status"
          value={formData.Status}
          onChange={handleChange}
        >
          <option value="In Progress">In Progress</option>
          <option value="Check In">Check In</option>
          <option value="Check Out">Check Out</option>
        </FormSelect>

        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </div>
  );
};

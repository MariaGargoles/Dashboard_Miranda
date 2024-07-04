import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addRoom } from '../../features/Room/RoomSlice';
import { FormContainer, FormTitle,
    FormLabel,
    FormInput,
    FormSelect,
    SubmitButton, BackButton } from './RoomStyled';

import { TbArrowBigLeftLines } from "react-icons/tb";
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


export const NewRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    photo: '',
    roomNumber: '',
    bedType: 'Single Bed',
    amenities: '',
    rate: '',
    offerPrice: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(addRoom(formData));
  };

  const goBack = () => {
    navigate('/rooms');
  };

  return (
    <>
    <FormContainer>
        <BackButton onClick={() => navigate('/rooms')}>
        <TbArrowBigLeftLines />
        <span>Back to Rooms</span>
      </BackButton>
      <FormTitle>Create a New Room</FormTitle>
      <form onSubmit={submitHandler}>
        <FormLabel>Photo</FormLabel>
        <FormInput
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
        />
        <FormLabel>Room Number</FormLabel>
        <FormInput
          type="text"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
        />
        <FormLabel>Bed Type</FormLabel>
        <FormSelect
          name="bedType"
          value={formData.bedType}
          onChange={handleChange}
        >
          <option>Single Bed</option>
          <option>Double Bed</option>
          <option>Double Superior</option>
          <option>Suite</option>
        </FormSelect>
        <FormLabel>Amenities</FormLabel>
        <FormInput
          type="text"
          name="amenities"
          value={formData.amenities}
          onChange={handleChange}
        />
        <FormLabel>Rate</FormLabel>
        <FormInput
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
        />
        <FormLabel>Offer Price</FormLabel>
        <FormInput
          type="number"
          name="offerPrice"
          value={formData.offerPrice}
          onChange={handleChange}
        />
        <SubmitButton type="submit">Send</SubmitButton>
        
      </form>
      
    </FormContainer>
    </>
  );
 
};


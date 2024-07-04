import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { addRoom } from '../../features/Room/RoomSlice';
import {
  FormContainer,
  FormTitle,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  BackButton,
  CheckboxContainer,
  FormAmenitiesLabel,
  AmenitiesInput
} from './RoomStyled';

import { TbArrowBigLeftLines } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

export const NewRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    photo: '',
    roomNumber: '',
    bedType: 'Single Bed',
    amenities: [],
    rate: '',
    offerPrice: '',
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    if (type === 'checkbox') {
      setFormData(prevState => {
        const amenities = checked
          ? [...prevState.amenities, value]
          : prevState.amenities.filter(amenity => amenity !== value);

        return { ...prevState, amenities };
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(addRoom({
      photo: formData.photo,
      number: formData.roomNumber,
      BedType: formData.bedType,
      Amenities: formData.amenities,
      Rate: formData.rate,
      OfferPrice: formData.offerPrice,
      Status: 'Available',  // Asigna un estado inicial por defecto
      RoomFloor: '1',  // Puedes cambiar esto si es necesario
    }));
    navigate('/rooms');
  };

  return (
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
        <CheckboxContainer>
          <div>
            <AmenitiesInput
              type="checkbox"
              value="Shower"
              checked={formData.amenities.includes('Shower')}
              onChange={handleChange}
            />
            <FormAmenitiesLabel>Shower</FormAmenitiesLabel>
          </div>
          <div>
            <AmenitiesInput
              type="checkbox"
              value="Double Bed"
              checked={formData.amenities.includes('Double Bed')}
              onChange={handleChange}
            />
            <FormAmenitiesLabel>Double Bed</FormAmenitiesLabel>
          </div>
          <div>
            <AmenitiesInput
              type="checkbox"
              value="Towel"
              checked={formData.amenities.includes('Towel')}
              onChange={handleChange}
            />
            <FormAmenitiesLabel>Towel</FormAmenitiesLabel>
          </div>
          <div>
            <AmenitiesInput
              type="checkbox"
              value="Bathup"
              checked={formData.amenities.includes('Bathup')}
              onChange={handleChange}
            />
            <FormAmenitiesLabel>Bathup</FormAmenitiesLabel>
          </div>
          <div>
            <AmenitiesInput
              type="checkbox"
              value="Coffee Set"
              checked={formData.amenities.includes('Coffee Set')}
              onChange={handleChange}
            />
            <FormAmenitiesLabel>Coffee Set</FormAmenitiesLabel>
          </div>
          <div>
            <AmenitiesInput
              type="checkbox"
              value="LED TV"
              checked={formData.amenities.includes('LED TV')}
              onChange={handleChange}
            />
            <FormAmenitiesLabel>LED TV</FormAmenitiesLabel>
          </div>
          <div>
            <AmenitiesInput
              type="checkbox"
              value="Wifi"
              checked={formData.amenities.includes('Wifi')}
              onChange={handleChange}
            />
            <FormAmenitiesLabel>Wifi</FormAmenitiesLabel>
          </div>
        </CheckboxContainer>
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
  );
};

import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from "../../app/hooks"
import { addRoomThunk } from '../../features/Room/RoomThunk'; 
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import {
  FormTitle,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  BackButton,
  CheckboxContainer,
  FormAmenitiesLabel,
  AmenitiesInput,
} from '../RoomComponent/RoomStyled';
import { TbArrowBigLeftLines } from 'react-icons/tb';
import { unwrapResult } from '@reduxjs/toolkit';

interface FormData {
  photo: string;
  number: string;
  bedType: string;
  amenities: string[];
  rate: number; 
  offerPrice: number; 
}

export const NewRoom: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    photo: '',
    number: '',
    bedType: 'Single Bed',
    amenities: [],
    rate: 0, 
    offerPrice: 0, 
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const target = event.target as HTMLInputElement | HTMLSelectElement;
    
    if (target instanceof HTMLInputElement) {
      const { name, value, type, checked } = target;

      if (type === 'checkbox') {
        setFormData(prevState => {
          const amenities = checked
            ? [...prevState.amenities, value]
            : prevState.amenities.filter(amenity => amenity !== value);

          return { ...prevState, amenities };
        });
      } else {
        setFormData(prevState => ({
          ...prevState,
          [name]: type === 'number' ? Number(value) : value
        }));
      }
    } else if (target instanceof HTMLSelectElement) {
      const { name, value } = target;
      setFormData(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  const submitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const newRoomData = {
        photo: formData.photo,
        number: formData.number,
        BedType: formData.bedType,
        Amenities: formData.amenities,
        Rate: formData.rate,
        OfferPrice: formData.offerPrice,
        Status: 'Available', 
        RoomFloor: '1', 
      };

      
      const resultAction = await dispatch(addRoomThunk(newRoomData));
      unwrapResult(resultAction); 
      Swal.fire('Success', 'Room added successfully', 'success');
      navigate('/rooms');
    } catch (error) {
      Swal.fire('Error', 'There was an error adding the room', 'error');
    }
  };

  return (
    <div>
      <BackButton onClick={() => navigate('/rooms')}>
        <TbArrowBigLeftLines />
        <span>Back to Rooms</span>
      </BackButton>
      <FormTitle>Create a New Room</FormTitle>
      <form onSubmit={submitHandler}>
        <FormLabel>Photo:</FormLabel>
        <FormInput
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
        />
        
        <FormLabel>Room Number:</FormLabel>
        <FormInput
          type="text"
          name="number"
          value={formData.number}
          onChange={handleChange}
        />
        
        <FormLabel>Bed Type:</FormLabel>
        <FormSelect
          name="bedType"
          value={formData.bedType}
          onChange={handleChange}
        >
          <option value="Single Bed">Single Bed</option>
          <option value="Double Bed">Double Bed</option>
          <option value="Double Superior">Double Superior</option>
          <option value="Suite">Suite</option>
        </FormSelect>
        
        <FormLabel>Amenities:</FormLabel>
        <CheckboxContainer>
          {['Shower', 'Double Bed', 'Towel', 'Bathtub', 'Coffee Set', 'LED TV', 'WiFi'].map(amenity => (
            <div key={amenity}>
              <AmenitiesInput
                type="checkbox"
                value={amenity}
                checked={formData.amenities.includes(amenity)}
                onChange={handleChange}
              />
              <FormAmenitiesLabel>{amenity}</FormAmenitiesLabel>
            </div>
          ))}
        </CheckboxContainer>
        
        <FormLabel>Rate:</FormLabel>
        <FormInput
          type="number"
          name="rate"
          value={formData.rate}
          onChange={handleChange}
        />
        
        <FormLabel>Offer Price:</FormLabel>
        <FormInput
          type="number"
          name="offerPrice"
          value={formData.offerPrice}
          onChange={handleChange}
        />
        
        <SubmitButton type="submit">Submit</SubmitButton>
      </form>
    </div>
  );
};

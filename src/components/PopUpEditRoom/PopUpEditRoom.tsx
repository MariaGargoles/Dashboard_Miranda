import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { updateRoomThunk } from '../../features/Room/RoomThunk';
import Swal from 'sweetalert2';
import { Modal, ModalCard } from '../PopUpUserComponent/PopUpUserStyled';
import {
  FormTitle,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  BackButton,
  CheckboxContainer,
  FormAmenitiesLabel,
  AmenitiesInput
} from '../RoomComponent/RoomStyled';
import { unwrapResult } from '@reduxjs/toolkit';
import { Room } from '../../types/global';

interface UpdateRoomModalProps {
  room: Room;
  onClose: () => void;
}

export const EditRoomModal: React.FC<UpdateRoomModalProps> = ({ room, onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Room>({
    ...room,
    amenities: room.amenities || []
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prevState => {
        const amenities = checked
          ? [...prevState.amenities, value]
          : prevState.amenities.filter(amenity => amenity !== value);

        return { ...prevState, amenities }; 
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const resultAction = await dispatch(updateRoomThunk(formData));
      unwrapResult(resultAction); 
      Swal.fire("Success", "Room updated successfully", "success");
      onClose();
    } catch (error) {
      Swal.fire("Error", "Failed to update the room", "error");
    }
  };

  return (
    <Modal onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <FormTitle>Edit Room</FormTitle>
        <form onSubmit={handleSubmit}>
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
            name="bedType"  // Ensure consistent naming here as well
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
            name="rate"  // Ensure consistent naming here
            value={formData.rate}
            onChange={handleChange}
          />
          
          <FormLabel>Offer Price:</FormLabel>
          <FormInput
            type="number"
            name="offerPrice"  // Ensure consistent naming here
            value={formData.offerPrice}
            onChange={handleChange}
          />
          
          <SubmitButton type="submit">Save</SubmitButton>
          <BackButton onClick={onClose}>Cancel</BackButton>
        </form>
      </ModalCard>
    </Modal>
  );
};

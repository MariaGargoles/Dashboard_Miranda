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
} from '../RoomComponent/RoomStyled';
import { unwrapResult } from '@reduxjs/toolkit';
import { Room } from '../../types/global';

interface UpdateRoomModalProps {
  room: Room;
  onClose: () => void;
}

export const EditRoomModal: React.FC<UpdateRoomModalProps> = ({ room, onClose }) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<Room>({ ...room });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(updateRoomThunk(formData));
      unwrapResult(resultAction);
      Swal.fire('Success', 'Room updated successfully', 'success');
      onClose();
    } catch (error) {
      Swal.fire('Error', 'There was an error updating the room', 'error');
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
            name="BedType"
            value={formData.BedType}
            onChange={handleChange}
          >
            <option value="">Select Bed Type</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Double Superior">Double Superior</option>
            <option value="Suite">Suite</option>
          </FormSelect>
          <FormLabel>Amenities:</FormLabel>
          <FormInput
            type="text"
            name="Amenities"
            value={formData.Amenities.join(', ')} 
            onChange={handleChange}
          />
          <FormLabel>Rate:</FormLabel>
          <FormInput
            type="number"
            name="Rate"
            value={formData.Rate}
            onChange={handleChange}
          />
          <FormLabel>Offer Price:</FormLabel>
          <FormInput
            type="number"
            name="OfferPrice"
            value={formData.OfferPrice}
            onChange={handleChange}
          />
          <SubmitButton type="submit">Save</SubmitButton>
          <BackButton onClick={onClose}>Cancel</BackButton>
        </form>
      </ModalCard>
    </Modal>
  );
};

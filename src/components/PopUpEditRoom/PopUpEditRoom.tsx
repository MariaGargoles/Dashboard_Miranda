import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateRoom } from '../../features/Room/RoomSlice';
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
import { Modal, ModalCard } from '../PopUpUserComponent/PopUpUserStyled';
import Swal from 'sweetalert2';

interface Room {
    id: string;
    photo: string;
    number: string;
    BedType: string;
    Amenities: string[];
    Rate: number;
    OfferPrice: number;
    Status: string;
    RoomFloor: string;
}

interface UpdateRoomProps {
    room: Room;
    onClose: () => void;
}

export const EditRoomModal: React.FC<UpdateRoomProps> = ({ room, onClose }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
      photo: '',
      roomNumber: '',
      bedType: '',
      amenities: [] as string[],
      rate: 0,
      offerPrice: 0,
    });

    useEffect(() => {
        if (room) {
            setFormData({
                photo: room.photo,
                roomNumber: room.number,
                bedType: room.BedType,
                amenities: room.Amenities,
                rate: room.Rate,
                offerPrice: room.OfferPrice,
            });
        }
    }, [room]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = event.target as HTMLInputElement;

        if (type === 'checkbox') {
            setFormData((prev) => {
                const newAmenities = checked
                    ? [...prev.amenities, value]
                    : prev.amenities.filter((amenity) => amenity !== value);
                return { ...prev, amenities: newAmenities };
            });
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: type === 'number' ? Number(value) : value,
            }));
        }
    };

    const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const updatedRoom = {
            id: room.id,
            photo: formData.photo,
            number: formData.roomNumber,
            BedType: formData.bedType,
            Amenities: formData.amenities,
            Rate: formData.rate,
            OfferPrice: formData.offerPrice,
            Status: room.Status,
            RoomFloor: room.RoomFloor,
        };

        try {
            await dispatch(updateRoom(updatedRoom));
            Swal.fire('Updated!', 'Room details updated successfully.', 'success');
            onClose();
        } catch (error: any) {
            Swal.fire('Error!', `There was an error updating the room: ${error.message}`, 'error');
        }
    };

    return (
        <Modal onClick={onClose}>
            <ModalCard onClick={(e) => e.stopPropagation()}>
                <FormTitle>Edit Room</FormTitle>
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
                        <option value="">Select Bed Type</option>
                        <option value="Single Bed">Single Bed</option>
                        <option value="Double Bed">Double Bed</option>
                        <option value="Double Superior">Double Superior</option>
                        <option value="Suite">Suite</option>
                    </FormSelect>
                    <FormLabel>Amenities</FormLabel>
                    <CheckboxContainer>
                        {['Shower', 'Double Bed', 'Towel', 'Bathup', 'Coffee Set', 'LED TV', 'Wifi'].map((amenity) => (
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
                <BackButton onClick={onClose}>Back</BackButton>
            </ModalCard>
        </Modal>
    );
};

import { useDispatch } from 'react-redux';
import { useState, ChangeEvent, FormEvent } from 'react';
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


interface FormData {
  photo: string;
  roomNumber: string;
  bedType: string;
  amenities: string[];
  rate: number; 
  offerPrice: number; 
}

export const NewRoom = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

 
  const [formData, setFormData] = useState<FormData>({
    photo: '',
    roomNumber: '',
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


  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(addRoom({
        photo: formData.photo,
        number: formData.roomNumber,
        BedType: formData.bedType,
        Amenities: formData.amenities,
        Rate: formData.rate,
        OfferPrice: formData.offerPrice,
        Status: 'Available',
        RoomFloor: '1',
        id: ''
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
          {['Shower', 'Double Bed', 'Towel', 'Bathup', 'Coffee Set', 'LED TV', 'Wifi'].map(amenity => (
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
    </FormContainer>
  );
};

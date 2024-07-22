import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { AppDispatch } from "../../app/store";
import { updateUser } from '../../features/Users/UserSlice';
import { Modal, ModalCard } from '../PopUpUserComponent/PopUpUserStyled';
import {
  FormTitle,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  BackButton
} from '../RoomComponent/RoomStyled';
import { User } from '../../types/global';

interface EditUserModalProps {
  user: User; // Cambiado de `onSave` a `user` para pre-poblar el formulario
  onSave: (user: User) => void;
  onCancel: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onSave, onCancel }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = React.useState<User>(user);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const updatedUser = {
        id: formData.id,
        foto: formData.foto,
        name: formData.name,
        startDate: formData.startDate,
        description: formData.description,
        email: formData.email,
        contact: formData.contact,
        status: formData.status,
      };

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          await dispatch(updateUser(formData) as any); 
          Swal.fire('Updated!', 'User details updated successfully.', 'success');
          onSave(formData);
        } catch (error: any) {
          Swal.fire('Error!', `There was an error updating the user: ${error.message}`, 'error');
        }
      };
    }

    return (
      <Modal onClick={onCancel}>
        <ModalCard onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          <FormTitle>Edit User</FormTitle>
          <form onSubmit={handleSubmit}>
            <FormLabel>Photo URL:</FormLabel>
            <FormInput
              type="text"
              name="foto"
              value={formData.foto}
              onChange={handleChange}
            />

            <FormLabel>Name:</FormLabel>
            <FormInput
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <FormLabel>ID:</FormLabel>
            <FormInput
              type="text"
              name="id"
              value={formData.id}
              disabled
            />

            <FormLabel>Start Date:</FormLabel>
            <FormInput
              type="text"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
            />

            <FormLabel>Description:</FormLabel>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />

            <FormLabel>Email:</FormLabel>
            <FormInput
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />

            <FormLabel>Contact:</FormLabel>
            <FormInput
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />

            <FormLabel>Status:</FormLabel>
            <FormSelect
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </FormSelect>

            <SubmitButton type="submit">Save</SubmitButton>
            <BackButton onClick={onCancel}>Cancel</BackButton>
          </form>
        </ModalCard>
      </Modal>
    );
};

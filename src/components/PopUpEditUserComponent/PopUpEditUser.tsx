import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { AppDispatch } from "../../app/store";
import { addUser, updateUser } from '../../features/Users/UserSlice';
import { Modal, ModalCard } from '../PopUpUserComponent/PopUpUserStyled';
import {
  FormTitle,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  BackButton
} from '../RoomComponent/RoomStyled';

export interface User {  
    foto: string;          
    name: string;         
    id: string;           
    startDate: string;    
    description: string;  
    email: string;        
    contact: string;      
    status: string;       
}

interface EditUserModalProps {
  user: User | null;
  onSave: (user: User) => void;
  onCancel: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onSave, onCancel }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = React.useState<User>({
      foto: user?.foto || '',  
      name: user?.name || '',
      id: user?.id || '',
      startDate: user?.startDate || '',
      description: user?.description || '',
      email: user?.email || '',
      contact: user?.contact || '',
      status: user?.status || 'ACTIVE'
    });
  
    React.useEffect(() => {
      if (user) {
        setFormData({
          foto: user.foto,  
          name: user.name,
          id: user.id,
          startDate: user.startDate,
          description: user.description,
          email: user.email,
          contact: user.contact,
          status: user.status
        });
      }
    }, [user]);
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData(prevFormData => ({ ...prevFormData as User, [name]: value }));
    };
  
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      try {
        if (user?.id) {
          const resultAction = await dispatch(updateUser(formData));
          if (updateUser.fulfilled.match(resultAction)) {
            Swal.fire('Success', 'User updated successfully', 'success');
            onSave(formData);
          } else {
            throw new Error(resultAction.error.message || 'Failed to update user');
          }
        } else {
          const resultAction = await dispatch(addUser(formData));
          if (addUser.fulfilled.match(resultAction)) {
            Swal.fire('Success', 'User added successfully', 'success');
            onSave(formData);
          } else {
            throw new Error(resultAction.error.message || 'Failed to add user');
          }
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        Swal.fire('Error', `There was an error: ${errorMessage}`, 'error');
      }
    };
  
    return (
      <Modal onClick={onCancel}>
        <ModalCard onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
          <FormTitle>{user?.id ? 'Edit User' : 'Add New User'}</FormTitle>
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
            <BackButton  onClick={onCancel}>Cancel</BackButton>
          </form>
        </ModalCard>
      </Modal>
    );
  };


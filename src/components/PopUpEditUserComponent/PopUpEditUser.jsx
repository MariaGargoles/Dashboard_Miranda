import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addUser, updateUser } from '../../features/Users/UserSlice';
import Swal from 'sweetalert2';
import { Modal, ModalCard } from '../PopUpUserComponent/PopUpUserStyled';
import {
  FormTitle,
  FormLabel,
  FormInput,
  FormSelect,
  SubmitButton,
  BackButton
} from '../RoomComponent/RoomStyled'; 

export const EditUserModal = ({ user, onSave, onCancel }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    photo: user?.photo || '',
    name: user?.name || '',
    id: user?.id || '',
    startDate: user?.startDate || '',
    description: user?.description || '',
    email: user?.email || '',
    contact: user?.contact || '',
    status: user?.status || 'ACTIVE'
  });

  useEffect(() => {
    setFormData({
      photo: user?.photo || '',
      name: user?.name || '',
      id: user?.id || '',
      startDate: user?.startDate || '',
      description: user?.description || '',
      email: user?.email || '',
      contact: user?.contact || '',
      status: user?.status || 'ACTIVE'
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user?.id) {
      dispatch(updateUser(formData))
        .then(() => {
          Swal.fire('Success', 'User updated successfully', 'success');
          onSave(formData);
        })
        .catch(() => {
          Swal.fire('Error', 'There was an error updating the user', 'error');
        });
    } else {
      dispatch(addUser(formData))
        .then(() => {
          Swal.fire('Success', 'User added successfully', 'success');
          onSave(formData);
        })
        .catch(() => {
          Swal.fire('Error', 'There was an error adding the user', 'error');
        });
    }
  };

  return (
    <Modal onClick={onCancel}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        <FormTitle>{user?.id ? 'Edit User' : 'Add New User'}</FormTitle>
        <form onSubmit={handleSubmit}>
          <FormLabel>Photo URL:</FormLabel>
          <FormInput
            type="text"
            name="photo"
            value={formData.photo}
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
            rows="4"
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
          <BackButton type="button" onClick={onCancel}>Cancel</BackButton>
        </form>
      </ModalCard>
    </Modal>
  );
};

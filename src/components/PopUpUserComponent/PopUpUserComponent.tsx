import React, { useState, useEffect } from "react";
import { Modal, ModalCard, Button, ModalTitle, ModalLabel, ModalInput } from "./PopUpUserStyled";


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

interface PopupUserComponentProps {
    isOpen: boolean;
    onClose: () => void;
    editUser: (fullName: string, email: string) => void;
    user: User;
  }
  export const PopupUserComponent: React.FC<PopupUserComponentProps> = ({ isOpen, onClose, editUser, user }) => {
    const [fullName, setFullName] = useState<string>(user.name);
    const [email, setEmail] = useState<string>(user.email);

  useEffect(() => {
    if (isOpen) {
      setFullName(user.name || "");
      setEmail(user.email || "");
    }
  }, [isOpen, user]);

  const handleSave = () => {
    if (fullName !== user.name || email !== user.email) {
      editUser(fullName, email);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalCard>
        <ModalTitle>Edit User</ModalTitle>
        <ModalLabel>Full Name</ModalLabel>
        <ModalInput
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Edit full name"
        />
        <ModalLabel>Email</ModalLabel>
        <ModalInput
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Edit email"
        />
        <div>
        <Button type="button" onClick={handleSave} variant="save">
          Save
        </Button>
        <Button type="button" onClick={onClose} variant="close">
          Close
        </Button>
        <Button type="button" onClick={() => {
          setFullName("");
          setEmail("");
        }} variant="erase">
          Erase
        </Button>
        </div>
      </ModalCard>
    </Modal>
  );
};

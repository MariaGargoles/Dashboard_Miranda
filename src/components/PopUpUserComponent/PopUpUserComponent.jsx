import React, { useState, useEffect } from "react";
import { Modal, ModalCard, Button, ModalTitle, ModalLabel, ModalInput } from "./PopUpUserStyled.js";

export const PopupUserComponent = ({ isOpen, onClose, editUser }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFullName(editUser.name || "");
      setEmail(editUser.email || "");
    }
  }, [isOpen, editUser]);

  const handleSave = () => {
    if (fullName !== editUser.name || email !== editUser.email) {
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

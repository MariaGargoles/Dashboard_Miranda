import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthUserContext.jsx"; 
import { Modal, ModalCard } from "./PopUpUserStyled.js";

export const PopupUserComponent = ({ isOpen, onClose }) => {
  const { state, updateUser } = useContext(AuthContext); 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFullName(state.user.name);
      setEmail(state.user.email);
    }
  }, [isOpen, state.user.name, state.user.email]);

  const handleSave = () => {
    if (fullName !== state.user.name || email !== state.user.email) {
      updateUser(fullName, email);
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    <Modal>
      <ModalCard>
        <h2>Edit User</h2>
        <label>Full Name</label>
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Edit full name"
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Edit email"
        />
        <button styled="save" onClick={handleSave}>
          Save
        </button>
        <button styled="close" onClick={onClose}>
          Close
        </button>
        <button styled="erase" onClick={() => {
          setFullName("");
          setEmail("");
        }}>
          Erase
        </button>
      </ModalCard>
    </Modal>
  );
};

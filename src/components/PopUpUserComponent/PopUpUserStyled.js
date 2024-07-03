import { useContext, useState } from "react";
import { UserContext } from "../../context/userContext.jsx";

export const PopupUserComponent = ({ isOpen, onClose }) => {
  const { state, dispatch } = useContext(UserContext);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = () => {
    if (fullName !== state.name || email !== state.email) {
      dispatch({
        type: "UPDATE_USER",
        payload: {
          name: fullName,
          email: email,
        },
      });
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
        <button styled="erase" onClick={""}>
          Erase
        </button>
      </ModalCard>
    </Modal>
  );
};

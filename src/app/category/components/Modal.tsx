import CategoryDropdown from "@/app/food/components/CategoryDropdown";
import React from "react";
import styled from "styled-components";
import DeleteIcon from "./DeletIcon";

// Define types for props
interface ModalProps {
  isOpen: boolean;
  value: string;
  onClose: () => void;
  onConfirm: () => void;
}

// Styled components for the modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 50px;
  border-radius: 5px;
  .confirm {
    background-color: #af1212;
    color: white;
    transition: background-color 0.2s ease-out;
    transition-delay: 0.2s;
  }
  .confirm:hover {
    background-color: #f80f0f;
  }

  border-radius: 10px;
`;

const Button = styled.button`
  margin-right: 10px;
  margin-top: 20px;
  width: 70px;
  height: 40px;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
`;

// Modal component with types
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, value }) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalContent>
        <p>Are you sure you want to delete this item ({value})?</p>
        <Button className="confirm" onClick={onConfirm}>
          Delete
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalContent>
    </Overlay>
  );
};

export default Modal;

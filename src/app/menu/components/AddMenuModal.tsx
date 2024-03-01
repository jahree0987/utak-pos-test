import React, { useState } from "react";
import styled from "styled-components";
import AddIcon from "./AddIcon";
import CloseIcon from "./CloseIcon";
import { useForm } from "react-hook-form";
import { error } from "console";
import { useMenuContext } from "./context/menuContext";
import { Menu } from "@/app/firebase/types/Menu";
import { addMenu } from "@/app/firebase/menu/addMenu";

const ModalWrapper = styled.div<{ isOpening: any }>`
  display: ${(props) => (props.isOpening ? "block" : "none")};
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
`;

const ModalContent = styled.div`
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 500px;
  border-radius: 20px;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;

    p {
      color: red;
      margin-top: -20px;
    }
    input {
      padding: 10px 10px;
      width: 100%;
      border: 1px solid #a2d7ae;
      border-radius: 10px;
    }

    input:focus {
      border: 2px solid #62b9c0;
    }

    .error {
      border: 1px solid red;
    }

    h2 {
      color: #62b9c0;
    }
  }
`;

function Modal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { fetchAllMenu, addNewMenutoArray, allMenu } = useMenuContext();

  const onSubmit = async (data: any) => {
    const menuKey = await addMenu(data);

    const newMenu: Menu = {
      name: data.name,
      keys: menuKey,
      description: data.description,
      items: [],
    };
    if (allMenu !== undefined) {
      addNewMenutoArray(allMenu, newMenu);
    }
    onClose();
    reset();
  };

  return (
    <ModalWrapper isOpening={isOpen}>
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Add Menu</h2>
          <input
            type="text"
            className={errors.name && "error"}
            placeholder="Enter name"
            {...register("name", { required: true })}
          />
          {errors.name && <p>This field is required</p>}
          <input
            type="text"
            className={errors.description && "error"}
            placeholder="Enter Description"
            {...register("description", { required: true })}
          />
          {errors.description && <p>This field is required</p>}

          <ButtonContainer>
            <button type="submit">
              <AddIcon />
            </button>
            <button type="button" onClick={onClose}>
              <CloseIcon />
            </button>
          </ButtonContainer>
        </form>
      </ModalContent>
    </ModalWrapper>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  gap: 30px;

  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
export default Modal;

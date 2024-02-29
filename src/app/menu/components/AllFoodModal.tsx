import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SingleItem from "./SingleItem";
import { useFoodContext } from "@/app/food/components/context/FoodContext";
import CloseIcon from "./CloseIcon";
import { useMenuContext } from "./context/menuContext";
import { AllMenuItems } from "../types/AllMenuItems";
import { Food } from "@/app/food/types/Food";

// Define the styled components for the modal
const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: #d3d3d3;
  padding: 30px;
  border-radius: 5px;
  width: 70%;

  h1 {
    text-align: center;
    color: #62b9c0;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;
const FoodContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 50px;
`;

interface ModalProps {
  isOpen: boolean;
  onClose: () => void; // onClose function prop
  menuKeys: string | undefined;
  notAvailableFood: string[];
}

const AllFoodModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  menuKeys,
  notAvailableFood,
}) => {
  const [availableFood, setAvailableFood] = useState<Food[]>();
  const { allFood } = useFoodContext();
  useEffect(() => {
    const filteredItems = allFood?.filter(
      (item) => item.keys && !notAvailableFood.includes(item.keys)
    ) as Food[];
    setAvailableFood(filteredItems);
  }, [notAvailableFood]);
  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };
  return (
    <ModalWrapper>
      <ModalContent>
        <button onClick={handleClose}>
          <CloseIcon />
        </button>
        <h1>All foods</h1>
        <FoodContainer>
          {availableFood &&
            availableFood.map((food, index) => {
              return <SingleItem item={food} key={index} type="modal" />;
            })}
        </FoodContainer>
        {/* Close button */}

        {/* Add your content for the modal here */}
      </ModalContent>
    </ModalWrapper>
  );
};

export default AllFoodModal;

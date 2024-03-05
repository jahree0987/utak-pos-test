'use client'
import styled from "styled-components";
import SingleItem from "./SingleItem";
import { useState } from "react";
import AllFoodModal from "./AllFoodModal";
import { useMenuContext } from "./context/menuContext";
import { AllMenuItems } from "../types/AllMenuItems";
import { useFoodContext } from "@/app/food/components/context/FoodContext";
import AddFoodMenuButton from "./AddFoodMenuButton";


export default function SingleMenu({
  menu,
  items,
}: {
  menu: any;
  items: AllMenuItems[] | undefined;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setSelectedMenu, selectedMenu, allMenuItems } = useMenuContext();
  const [notAvailableFood, setNotAvailableFood] = useState<string[]>([]);
  const { allFood } = useFoodContext();
  const handleClick = () => {
    setIsModalOpen(true);
    setSelectedMenu(menu.keys);

    const filteredItems = allMenuItems?.filter(
      (item) => item.menuKeys === menu.keys
    ) as AllMenuItems[];
    const itemKeys = filteredItems.map((item) => {
      return item.keys;
    });

    setNotAvailableFood(itemKeys);
  };

  return (
    <>
      <Div>{menu.name}</Div>
      <FoodContainer>
        <AddFoodMenuButton onClick={handleClick} menuName={menu.name} />  
        {items &&
          items.map((item, index) => {
            return <SingleItem key={index} item={item} menuKeys={menu.keys} />;
          })}
      </FoodContainer>
      <AllFoodModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        menuKeys={selectedMenu}
        notAvailableFood={notAvailableFood}
      />
    </>
  );
}
const Div = styled.div`
  border-radius: 43px;
  background-color: #fff;
  max-width: 90%;
  justify-content: center;
  align-items: start;
  color: #63bac2;
  white-space: nowrap;
  padding: 38px 52px;
  font: 400 48px/116.7% Roboto, sans-serif;
  @media (max-width: 991px) {
    font-size: 40px;
    white-space: initial;
    padding: 0 20px;
  }
`;

const FoodContainer = styled.div`
  flex-wrap: wrap; /* Allow items to wrap to the next line */
  display: flex;
  gap: 50px;
  margin: auto;
  margin-top: 50px;
  width: 85%;
  max-width: 2000px;
  margin-bottom: 50px;
`;

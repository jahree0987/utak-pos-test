import DeleteIcon from "@/app/category/components/DeletIcon";
import EditIcon from "@/app/category/components/EditIcon";
import * as React from "react";
import styled from "styled-components";
import Image from "next/image";
import burger4 from "../../../../public/burger4.jpg";
import { Food } from "../types/Food";
import { useFoodContext } from "./context/FoodContext";
import Modal from "@/app/category/components/Modal";
import { deleteFood } from "@/app/firebase/food/DeleteFood";

export default function SingleFood({ foodData }: { foodData: Food }) {
  const { setIsEditing, setEditFood, setEditFoodCategory, fetchFood } =
    useFoodContext();

  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const handleEdit = () => {
    setIsEditing(true);
    setEditFood(foodData);
    const dataCategory = {
      keys: foodData.categoryKeys,
      name: foodData.category,
    };
    setEditFoodCategory(dataCategory);
  };

  const handleDelete = async () => {
    console.log("Food KEYS", foodData.keys);
    await deleteFood(foodData.keys);
    fetchFood();
    setIsModalOpen(false);
  };
  return (
    <>
      <Div>
        <Div2>
          <Div3>{foodData.price}php</Div3>
          <img width={150} height={100} src={foodData.image} alt="food" />
          <Div4>stck: {foodData.stock}</Div4>
        </Div2>
        <Div5>
          <Div6>{foodData.name}</Div6>
          <Div7>{foodData.category}</Div7>
        </Div5>
        <Div8>{foodData.description}</Div8>
        <Div9>
          <button type="button" onClick={handleEdit}>
            <EditIcon />
          </button>
          <button type="button" onClick={() => setIsModalOpen(true)}>
            <DeleteIcon />
          </button>
        </Div9>
      </Div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        value={foodData.name}
        onConfirm={handleDelete}
      />
    </>
  );
}

const Div = styled.div`
  border-radius: 30px;
  box-shadow: 0px 20px 20px 0px rgba(170, 170, 170, 0.05);
  background-color: #fff;
  display: flex;
  width: 300px;
  flex-direction: column;
  padding: 10px;
  height: 263px;
`;

const Div2 = styled.div`
  display: flex;
  font-size: 12px;
  color: #000;
  font-weight: 500;
  white-space: nowrap;
  margin: auto;
  gap: 13px;

  img{
    border-radius: 20px;
  }
`;

const Div3 = styled.div`
  font-family: Roboto, sans-serif;
  border-radius: 12px;
  background-color: #c0fbc9;
  align-self: start;
  aspect-ratio: 1.76;
  justify-content: center;
  padding: 9px 10px;
`;

const Img = styled.img`
  aspect-ratio: 1.15;
  object-fit: auto;
  object-position: center;
  width: 155px;
  max-width: 100%;
`;

const Div4 = styled.div`
  font-family: Roboto, sans-serif;
  align-self: start;
  margin-top: 11px;
  flex-grow: 1;
`;

const Div5 = styled.div`
  display: flex;
  margin-top: 5px;
  justify-content: space-between;
  gap: 13px;
  font-weight: 500;
  white-space: nowrap;
  align-items: center;
`;

const Div6 = styled.div`
  color: #3d3d3d;
  letter-spacing: -0.48px;
  flex-grow: 1;
  font: 16px DM Sans, sans-serif;
  font-weight: 700;
`;

const Div7 = styled.div`
  border-radius: 7px;
  background-color: rgba(98, 185, 192, 1);
  flex-grow: 1;
  justify-content: center;
  color: #000;
  padding: 9px 0px;
  font: 10px/140% Roboto, sans-serif;
  text-align: center;
  text-transform: uppercase;
  font-weight: 600;
`;

const Div8 = styled.div`
  color: #3d3d3d;
  letter-spacing: -0.12px;
  margin-top: 7px;
  font: 400 12px/18px DM Sans, sans-serif;
`;

const Div9 = styled.div`
  align-self: center;
  display: flex;
  margin-top: 17px;
  width: 100%;
  max-width: 188px;
  justify-content: space-between;
  gap: 20px;

  button {
    border: none;
    background-color: transparent;
  }
`;

const Img2 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 100%;
  fill: #93d261;
  flex: 1;
`;

const Img3 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 100%;
  fill: #f21717;
  flex: 1;
`;

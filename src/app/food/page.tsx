"use client";
import styled from "styled-components";
import AddFoodForm from "./components/AddFoodFields";
import SingleFood from "./components/SingleFood";
import Navbar from "../navbar/Navbar";
import { useFoodContext } from "./components/context/FoodContext";
import { useEffect } from "react";

const FoodContainer = styled.div`
  width: 1000px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: auto;
  gap: 50px;
`;

const H1 = styled.div`
  width: 70%;
  margin: auto;
  font-size: 60px;
  color: #62b9c0;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 30px;
`;

const Main = styled.div`
  display: flex;
  align-items: flex-start;
`;

export default function Food() {
  const { allFood } = useFoodContext();

  return (
    <>
      <Navbar />

      <AddFoodForm />

      <FoodContainer>
        <H1>All Foods</H1>
        {allFood &&
          allFood.map((food, index) => {
            return <SingleFood key={index} foodData={food} />;
          })}
      </FoodContainer>
    </>
  );
}

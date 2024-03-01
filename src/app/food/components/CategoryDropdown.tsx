"use client";
import { useCategory } from "@/app/category/components/context/CategoryContext";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useFoodContext } from "./context/FoodContext";

const DropdownWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownButton = styled.button`
  background-color: transparent;
  color: #909090;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  width: 100%;
  border-radius: 15px;
  border: 1px solid #a2d7ae;
  background-color: #fff;
  margin-top: 16px;
  color: #909090;
  white-space: nowrap;
  padding: 20px 60px 20px 20px;
  font: 400 14px/137% Roboto, sans-serif;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 991px) {
    white-space: initial;
    padding-right: 20px;
  }
`;

const DropdownContent = styled.div<{ open: boolean }>`
  display: ${(props) => (props.open ? "block" : "none")};
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  width: 100%;
`;

const DropdownItem = styled.div`
  padding: 12px 16px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }
`;

const Img2 = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
`;

function CategoryDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const { categories } = useCategory();
  const {
    selectedCategory,
    setSelectedCategory,
    isEditing,
    editFood,
    editFoodCategory,
  } = useFoodContext();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCategorySelect = (category: any) => {
    setSelectedCategory(category); 
    setIsOpen(false); 
  };

  return (
    <DropdownWrapper>
      <DropdownButton type="button" onClick={toggleDropdown}>
        <p>
          {selectedCategory
            ? `${selectedCategory.name}`
            : editFoodCategory
            ? `${editFoodCategory.name}`
            : "Choose Category"}
        </p>

        <Img2
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c9c2ac3bc74a42a0aa814a94f8f6a914fe08083b29f59f331f458c9a37db420?"
        />
      </DropdownButton>
      <DropdownContent open={isOpen}>
        {categories &&
          categories.map((category, index) => {
            return (
              <DropdownItem
                key={index}
                onClick={() => handleCategorySelect(category)}
              >
                {category.name}
              </DropdownItem>
            );
          })}
      </DropdownContent>
    </DropdownWrapper>
  );
}

export default CategoryDropdown;

// components/Sidebar.tsx
"use client";
import styled from "styled-components";
import Image from "next/image";
import logo from "./assets/logo.png";
import CategoryIcon from "./components/CategoryIcon";
import FoodIcon from "./components/FoodIcon";
import MenuIcon from "./components/MenuIcon";
import { useMenu } from "../services/MenuContext";
import { useEffect } from "react";

const SidebarContainer = styled.div`
  height: 100%;
  width: 200px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #333;
  padding-top: 20px;
`;

const SidebarList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const SidebarListItem = styled.li`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const SidebarLink = styled.a`
  text-decoration: none;
  color: white;

  &:hover {
    color: #ddd;
  }
`;

const Navbar = () => {
  const { chooseMenu } = useMenu();

  const clickCategory = () => {
    chooseMenu("category");
  };
  const clickFood = () => {
    chooseMenu("food");
  };
  const clickMenu = () => {
    chooseMenu("menu");
  };
  return (
    <SidebarContainer>
      <SidebarList>
        <Image src={logo} alt="logo" width={100} height={100} />
        <SidebarListItem>
          <CategoryIcon />
          <SidebarLink href="#" onClick={clickCategory}>
            Category
          </SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <FoodIcon />
          <SidebarLink href="#" onClick={clickFood}>
            Food
          </SidebarLink>
        </SidebarListItem>
        <SidebarListItem>
          <MenuIcon />
          <SidebarLink href="#" onClick={clickMenu}>
            Menu
          </SidebarLink>
        </SidebarListItem>
      </SidebarList>
    </SidebarContainer>
  );
};

export default Navbar;

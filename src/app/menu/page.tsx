'use client'
import styled from "styled-components";
import SingleMenu from "./components/SingleMenu";
import AddMenuButton from "./components/AddMenutButton";
import { useState } from "react";
import Modal from "./components/AddMenuModal";
import { useMenuContext } from "./components/context/menuContext";

export default function Menu() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { allMenu } = useMenuContext();
  const handleClick = () => {
    setIsModalOpen(true); 
  };
  return (
    <>
      <AddMenuButton onClick={handleClick} />
      {allMenu &&
        allMenu.map((menu, index) => {
          return <SingleMenu key={index} menu={menu} items={menu.items} />;
        })}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

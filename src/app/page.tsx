"use client";
import Navbar from "./navbar/Navbar";
import styled from "styled-components";
import { useMenu } from "./context/MenuContext";

export default function Home() {
  const { navMenu } = useMenu();
  return (
    <>
      <Navbar />;
      <MainDiv>
        {navMenu &&
          navMenu.map((menu, index) => {
            if (menu.isTrue) {
              return <div key={index}>{menu.component}</div>;
            }
          })}
      </MainDiv>
    </>
  );
}

const MainDiv = styled.div`
  width: 100%;
  margin-left: 210px;
  height: 100vh;
`;

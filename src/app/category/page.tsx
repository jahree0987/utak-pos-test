"use client";
import styled from "styled-components";
import AddCategoryForm from "./components/AddCategoryFields";
import AddCategoryTable from "./components/Table";
import Navbar from "../navbar/Navbar";
import { useEffect } from "react";
import { addCategory, fetchCategory } from "../firebase";
import { Category } from "../firebase/types/Category";
const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AddCategoryContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export default function Category() {
 
  return (
    <>
      <Navbar />
      <Div>
        <AddCategoryContainer>
          <AddCategoryForm />
          <AddCategoryTable />
        </AddCategoryContainer>
      </Div>
    </>
  );
}

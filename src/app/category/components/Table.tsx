import React, { useEffect, useState } from "react";
import styled from "styled-components";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeletIcon";
import { fetchCategory } from "@/app/firebase";
import SingleCategory from "./SingleCategory";
import { CategoryData } from "../types/Category";
import { useCategory } from "./context/CategoryContext";

const TableWrapper = styled.div`
  color: #63bac1;
  margin-top: 120px;
`;

const Table = styled.table`
  width: 50%;
  border-collapse: collapse;
  margin: auto;
`;

const TableHeader = styled.thead`
  background-color: #f2f2f2;
`;

const TableHeaderCell = styled.th`
  padding: 8px;
  border-bottom: 1px solid #ddd;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  text-align: center;
`;



export default function AddCategoryTable() {
  const { categories } = useCategory();

  return (
    <TableWrapper>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Category</TableHeaderCell>
            <TableHeaderCell>Date Created</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>
        <tbody>
          {categories &&
            categories.map((category) => {
              return <SingleCategory key={category.keys} category={category} />;
            })}
        </tbody>
      </Table>
    </TableWrapper>
  );
}

import styled from "styled-components";
import EditIcon from "./EditIcon";
import DeleteIcon from "./DeletIcon";
import { CategoryData } from "../types/Category";
import { useCategory } from "./context/CategoryContext";
import { useState } from "react";
import Modal from "./Modal";
import { deleteCategory } from "@/app/firebase";

export default function SingleCategory({
  category,
}: {
  category: CategoryData;
}) {
  const { setIsEditing, setEditCategory, fetchCategoryData } = useCategory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    setEditCategory(category);
  };

  const handleDelete = async () => {
    console.log(category.keys);
    await deleteCategory(category.keys)
    fetchCategoryData()
    setIsModalOpen(false)
  };

  return (
    <TableRow>
      <TableCell>{category.name}</TableCell>
      <TableCell>{category.dateCreated}</TableCell>
      <TableCell>
        <button onClick={handleEdit}>
          <EditIcon />
        </button>
      </TableCell>
      <TableCell>
        <button onClick={() => setIsModalOpen(true)}>
          <DeleteIcon />
        </button>
      </TableCell>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDelete}
        value={category.name}
      />
    </TableRow>
  );
}

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
  text-align: center;
`;

const TableCell = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;

  button {
    border: none;
  }
`;

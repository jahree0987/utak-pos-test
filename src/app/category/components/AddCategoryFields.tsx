import styled from "styled-components";
import AddButton from "./AddButton";
import { useForm } from "react-hook-form";
import { addCategory, updateCategory } from "@/app/firebase";
import { CategoryData } from "../types/Category";
import { Category } from "@/app/firebase/types/Category";
import { useCategory } from "./context/CategoryContext";
import { useEffect } from "react";
import ClearButton from "./ClearButton";

export default function AddCategoryForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const {
    setCategories,
    categories,
    fetchCategoryData,
    isEditing,
    editCategory,
    setIsEditing,
    setEditCategory,
  } = useCategory();

  const handleClear = () => {
    reset();
    setIsEditing(false);
    setEditCategory({
      name: "",
      keys: "",
      description: "",
      dateCreated: "",
    });
  };

  const onSubmit = async (data: any) => {
    if (isEditing) {
      const editedCategory = {
        ...editCategory,
        name: data.name,
        description: data.description,
      } as CategoryData;
      await updateCategory(editedCategory);
      setIsEditing(false);
      await fetchCategoryData();
    } else {
      const newCategory = { ...data, dateCreated: new Date().toString() };
      const key = await addCategory(newCategory);
      await fetchCategoryData();
    }
    reset();
  };

  useEffect(() => {
    if (isEditing) {
      setValue("name", editCategory?.name);
      setValue("description", editCategory?.description);
    }
  }, [isEditing, editCategory]);

  return (
    <>
      <H1>{isEditing ? "Edit" : "Add"}Category</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputContainer>
          <input {...register("name")} type="text" placeholder="Name" />{" "}
          {errors.name && typeof errors.name === "string" && (
            <p>{errors.name}</p>
          )}
          <input
            {...register("description")}
            type="text"
            placeholder="Description"
          />
          {errors.description && typeof errors.description === "string" && (
            <p>{errors.description}</p>
          )}
          {isEditing && <ClearButton onClick={handleClear} />}
        </InputContainer>
        <Subtitle>
          <strong>Define Category:</strong> Clearly outline what items it
          includes and how it differs from existing categories.
        </Subtitle>
        <ButtonContainer>
          <AddButton type="submit">{isEditing ? "Edit" : "Add"}</AddButton>
        </ButtonContainer>
      </form>
    </>
  );
}

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Subtitle = styled.div`
  color: #0da086;
  text-align: left;
  width: 400px;
  margin: auto;
`;

const InputContainer = styled.div`
  margin-top: 30px;
  input {
    display: block;

    width: 484px;
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #ffffff;
    height: 40px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  button {
    border: none;
  }
`;

const H1 = styled.h1`
  color: #0da086;
  font-size: 34px;
  text-align: center;
  font-weight: normal;
  margin-top: 100px;
`;

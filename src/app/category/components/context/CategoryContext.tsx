"use client";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { CategoryData } from "../../types/Category";
import { fetchCategory } from "@/app/firebase";

// Step 1: Create a context object
const CategoryContext = createContext<{
  categories: CategoryData[] | undefined;
  setCategories: (setCategories: CategoryData[]) => void;
  fetchCategoryData: () => void;
  isEditing: boolean;
  setIsEditing: (setIsEditing: boolean) => void;
  editCategory: CategoryData | undefined;
  setEditCategory: (setEditCategory: CategoryData) => void;
  selectedCategory: CategoryData | undefined;
  setSelectedCategory: (setSelectedCategory: CategoryData) => void;
}>({
  categories: undefined,
  setCategories: () => {}, // Placeholder function
  fetchCategoryData: () => {},
  isEditing: false,
  setIsEditing: () => {},
  editCategory: undefined,
  setEditCategory: () => {},
  selectedCategory: undefined,
  setSelectedCategory: () => {},
});

// Step 2: Create a provider component
export const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [categories, setCategories] = useState<CategoryData[] | undefined>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editCategory, setEditCategory] = useState<CategoryData | undefined>();
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryData | undefined
  >();

  const fetchCategoryData = async () => {
    try {
      const categoryData = (await fetchCategory()) as CategoryData[];
      setCategories(categoryData);
    } catch (error) {
      console.log("Error in fetching Category:", error);
    }
  };

  useEffect(() => {
    fetchCategoryData();
  }, []);

  return (
    <CategoryContext.Provider
      value={{
        categories,
        setCategories,
        fetchCategoryData,
        isEditing,
        setIsEditing,
        editCategory,
        setEditCategory,
        selectedCategory,
        setSelectedCategory,
      }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

// Step 3: Create a custom hook to consume the context
export const useCategory = () => {
  return useContext(CategoryContext);
};

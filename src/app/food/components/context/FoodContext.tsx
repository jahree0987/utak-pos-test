"use client";
import { CategoryData } from "@/app/category/types/Category";
import { fetchFoodData } from "@/app/firebase/food/GetFood";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { Food } from "../../types/Food";
import { fetchItemMenu } from "@/app/firebase/menu/getItemMenu";
import { useMenuContext } from "@/app/menu/components/context/menuContext";
import { AllMenuItems } from "@/app/menu/types/AllMenuItems";

// Define the type for the context value

type FoodCategory = {
  keys: string;
  name: string;
};

type FoodContextType = {
  allFood: Food[] | undefined;
  changeFood: (newFood: string) => void;
  selectedCategory: CategoryData | undefined;
  setSelectedCategory: (category: CategoryData | undefined) => void;
  selectedFile: any;
  setSelectedFile: (file: any | undefined) => void;
  fetchFood: () => void;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  editFood: Food | undefined;
  setEditFood: (food: Food | undefined) => void;
  editFoodCategory: FoodCategory | undefined;
  setEditFoodCategory: (foodCategory: FoodCategory | undefined) => void;
};

// Create a new context
const FoodContext = createContext<FoodContextType | undefined>(undefined);

// Create a custom hook to use the FoodContext
export const useFoodContext = () => {
  const context = useContext(FoodContext);
  if (!context) {
    throw new Error("useFoodContext must be used within a FoodProvider");
  }
  return context;
};

// Define the props for the provider component
type FoodProviderProps = {
  children: ReactNode;
};

// Create a provider component
export const FoodProvider: React.FC<FoodProviderProps> = ({ children }) => {
  const [allFood, setAllFood] = useState<Food[]>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editFood, setEditFood] = useState<Food>();
  const [editFoodCategory, setEditFoodCategory] = useState<FoodCategory>();
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryData | undefined
  >();

  const [selectedFile, setSelectedFile] = useState<any>();

  const changeFood = (newFood: string) => {};

  const { setAllMenuItems } = useMenuContext();
  const fetchFood = async () => {
    try {
      const allFoodData = (await fetchFoodData()) as Food[];
      const itemMenus: any = await fetchItemMenu();
      let menuFoods: any = [];
      const allItemMenus = itemMenus.map((item: any) => {
        return allFoodData.map((food) => {
          if (item.foodKeys === food.keys) {
            const foodData = {
              ...food,
              menuKeys: item.menuKeys,
              menuItemID: item.keys,
            };
            menuFoods.push(foodData);
          }
        });
      });

      setAllMenuItems(menuFoods);
      setAllFood(allFoodData);
    } catch (error) {
      console.log("ERROR IN FETCHING FOOD", error);
    }
  };

  useEffect(() => {
    fetchFood();
  }, []);
  const value: FoodContextType = {
    allFood,
    changeFood,
    selectedCategory,
    setSelectedCategory,
    selectedFile,
    setSelectedFile,
    fetchFood,
    isEditing,
    setIsEditing,
    editFood,
    setEditFood,
    editFoodCategory,
    setEditFoodCategory,
  };

  return <FoodContext.Provider value={value}>{children}</FoodContext.Provider>;
};

"use client";
import { CategoryData } from "@/app/category/types/Category";
import { fetchFoodData } from "@/app/firebase/food/GetFood";
import { addFoodToOneMenu } from "@/app/firebase/menu/addFoodToMenu";
import { fetchItemMenu } from "@/app/firebase/menu/getItemMenu";
import { fetchMenu } from "@/app/firebase/menu/getMenu";
import { Menu } from "@/app/firebase/types/Menu";
import { useFoodContext } from "@/app/food/components/context/FoodContext";
import { Food } from "@/app/food/types/Food";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { AllMenuItems } from "../../types/AllMenuItems";

// Define the type for the context value

type FoodCategory = {
  keys: string;
  name: string;
};

type MenuContextType = {
  allMenu: Menu[] | undefined;
  setAllMenu: (allMenu: Menu[] | undefined) => void;
  fetchAllMenu: () => void;
  selectedMenu: string | undefined;
  setSelectedMenu: (menu: string) => void;
  addFoodToMenu: (
    menuKeys: string | undefined,
    foodKeys: string | undefined
  ) => void;
  allMenuItems: AllMenuItems[] | undefined;
  setAllMenuItems: (allItems: AllMenuItems[] | undefined) => void;
  removeItemFromMenuArray: (
    menu: Menu[] | undefined,
    itemId: string | undefined
  ) => Menu[] | undefined;

  addItemsMenu: (
    menu: Menu[] | undefined,
    menuKeys: string | undefined,
    item: AllMenuItems
  ) => Menu[] | undefined;

  addNewMenutoArray: (currentMenu: Menu[], newMenu: Menu) => void;
};

// Create a new context
const MenuContext = createContext<MenuContextType | undefined>(undefined);

// Create a custom hook to use the FoodContext
export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a FoodProvider");
  }
  return context;
};

// Define the props for the provider component
type MenuProviderProps = {
  children: ReactNode;
};

// Create a provider component
export const MenuProvider: React.FC<MenuProviderProps> = ({ children }) => {
  const [allMenu, setAllMenu] = useState<Menu[]>();
  const [selectedMenu, setSelectedMenu] = useState<string>("");
  const [allMenuItems, setAllMenuItems] = useState<AllMenuItems[]>();
  const [run, setRun] = useState(false);
  const addFoodToMenu = async (
    menuKeys: string | undefined,
    foodKeys: string | undefined
  ) => {
    addFoodToOneMenu(menuKeys, foodKeys);
  };

  const fetchAllMenu = async () => {
    const menus = (await fetchMenu()) as Menu[];
    setAllMenu(menus);
  };

  const addNewMenutoArray = (
    currentMenu: Menu[] | undefined,
    newMenu: Menu
  ) => {
    if (currentMenu === undefined) {
      setAllMenu([newMenu]); // Initialize allMenu if it's undefined
      return;
    }
    const updatedMenu = [...currentMenu, newMenu];
    setAllMenu(updatedMenu);
  };

  useEffect(() => {
    fetchAllMenu();
    // fetchItemMenus();
  }, []);

  const addItemsToMenuArray = (
    menus: Menu[],
    newItems: AllMenuItems[]
  ): Menu[] => {
    return menus.map((menu) => {
      if (!menu.items) {
        menu.items = [];
      }
      const filteredItems = newItems.filter(
        (item) => item.menuKeys === menu.keys
      );
      menu.items.push(...filteredItems);
      return menu;
    });
  };

  const addItemsMenu = (
    menus: Menu[] | undefined,
    menuKeys: string | undefined,
    item: AllMenuItems
  ): Menu[] | undefined => {
    return menus?.map((menu) => {
      if (menu.keys === menuKeys) {
        if (!menu.items) {
          menu.items = [];
        }
        menu.items.push(item);
      }
      return menu;
    });
  };

  const removeItemFromMenuArray = (
    menus: Menu[] | undefined,
    itemId: string | undefined
  ): Menu[] | undefined => {
    const filteredItems = menus?.map((menu) => ({
      ...menu,
      items: menu.items?.filter((item) => item.menuItemID !== itemId),
    }));
    return filteredItems;
  };

  useEffect(() => {
    if (allMenu && allMenuItems && run === false) {
      const newMenu = addItemsToMenuArray(allMenu, allMenuItems);
      setAllMenu(newMenu);
      setRun(true);
    }
  }, [allMenuItems, allMenu, run]);

  const value: MenuContextType = {
    allMenu,
    setAllMenu,
    fetchAllMenu,
    selectedMenu,
    setSelectedMenu,
    addFoodToMenu,
    setAllMenuItems,
    allMenuItems,
    removeItemFromMenuArray,
    addItemsMenu,
    addNewMenutoArray,
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

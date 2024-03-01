"use client";
import { CategoryData } from "@/app/category/types/Category";
import { addFoodToOneMenu } from "@/app/firebase/menu/addFoodToMenu";
import { fetchMenu } from "@/app/firebase/menu/getMenu";
import { Menu } from "@/app/firebase/types/Menu";
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from "react";
import { AllMenuItems } from "../../types/AllMenuItems";

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
  addFoodToMenuItemArray: (currentMenuItems: AllMenuItems[], foodItem: AllMenuItems) => void
};

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error("useMenuContext must be used within a FoodProvider");
  }
  return context;
};

type MenuProviderProps = {
  children: ReactNode;
};

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

  const addFoodToMenuItemArray = (
    currentMenuItem: AllMenuItems[],
    foodItem: AllMenuItems
  ) => {
    try {
      currentMenuItem.push(foodItem);
      return currentMenuItem
    } catch (error) {
      throw error;
    }
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
      setAllMenu([newMenu]);
      return;
    }
    const updatedMenu = [...currentMenu, newMenu];
    setAllMenu(updatedMenu);
  };

  useEffect(() => {
    fetchAllMenu();
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
    addFoodToMenuItemArray
  };

  return <MenuContext.Provider value={value}>{children}</MenuContext.Provider>;
};

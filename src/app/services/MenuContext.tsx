'use client'
import React, { createContext, useState, useContext, ReactNode } from "react";
import Food from "../food/page";
import Category from "../category/page";
import Menu from "../menu/page";

const initialMenuState = [
  {
    name: "category",
    isTrue: false,
    component: <Category/>
  },
  {
    name: "food",
    isTrue: false,
    component: <Food/>
  },
  {
    name: "menu",
    isTrue: false,
    component: <Menu/>
  },
];

// Step 1: Create a context object
const MenuContext = createContext<{
  navMenu: { name: string; isTrue: boolean; component:any;}[];
  chooseMenu: (chosenMenu: string) => void;
}>({
  navMenu: initialMenuState,
  chooseMenu: () => {}, // Placeholder function
});

// Step 2: Create a provider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [navMenu, setNavMenu] = useState(initialMenuState);

  const chooseMenu = (chosenMenu: string) => {
    const activeMenu = navMenu.map((menu, index) => {
      if (menu.name === chosenMenu) {
        return { ...menu, isTrue: true };
      } else {
        return { ...menu, isTrue: false};
      }
    });

    setNavMenu(activeMenu);
  };

  return (
    <MenuContext.Provider value={{ navMenu, chooseMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

// Step 3: Create a custom hook to consume the context
export const useMenu = () => {
  return useContext(MenuContext);
};

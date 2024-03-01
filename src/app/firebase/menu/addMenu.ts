import { push, ref } from "firebase/database";
import { Menu } from "../types/Menu";
import { db } from "..";

export const addMenu = async (menuData: Menu) => {
  try {
    const newCategoryRef = await push(ref(db, "menus"), menuData);
    return newCategoryRef.key;
  } catch (error) {
    console.error("Error adding menu:", error);
  }
};

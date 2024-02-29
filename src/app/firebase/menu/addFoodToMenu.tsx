import { push, ref } from "firebase/database";
import { db } from "..";

export const addFoodToOneMenu = async (
  menuKeys: string | undefined,
  foodKeys: string | undefined
) => {
  try {
    const newFoodMenuItem = {
      menuKeys,
      foodKeys,
    };
    const newMenuItemRef = await push(ref(db, "menuItems"), newFoodMenuItem);
    console.log("New item menu added with key:", newMenuItemRef.key);
    return newMenuItemRef.key;
  } catch (error) {
    console.error("Error adding  menu item:", error);
  }
};

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
    return newMenuItemRef.key;
  } catch (error) {
    console.error("Error adding  menu item:", error);
  }
};

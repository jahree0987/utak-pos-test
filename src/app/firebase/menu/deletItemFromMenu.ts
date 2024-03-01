import { ref, remove } from "firebase/database";
import { db } from "..";

export const deleteItemFromMenu = (keys: string | undefined) => {
  try {
    remove(ref(db, "menuItems/" + keys));
  } catch (error) {
    console.error("Error removing item menu : ", error);
  }
};

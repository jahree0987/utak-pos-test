import { ref, remove } from "firebase/database";
import { db } from "..";

export const deleteItemFromMenu = (keys: string | undefined) => {
  try {
    remove(ref(db, "menuItems/" + keys)).then(() =>
      alert("Successfully removed an item from menu")
    );
  } catch (error) {
    console.error("Error removing item menu : ", error);
  }
};

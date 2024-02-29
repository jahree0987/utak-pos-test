import { ref, remove } from "firebase/database";
import { db, storage } from "..";
import { uploadBytes, ref as storageRef, deleteObject } from "firebase/storage";

const deleteItemFromStorage = (keys: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Create a reference to the item you want to delete
    const itemRef = storageRef(storage, `images/${keys}`);

    // Delete the item
    return deleteObject(itemRef)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        console.log("error in deleting image");
        reject(error);
      });
  });
};

export const deleteFood = (keys: string) => {
  try {
    remove(ref(db, "food/" + keys));
    deleteItemFromStorage(keys).then(() => {
      alert("Item food removed");
    });
  } catch (error) {
    console.error("Error removing data: ", error);
  }
};

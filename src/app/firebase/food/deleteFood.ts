import { ref, remove } from "firebase/database";
import { db, storage } from "..";
import { uploadBytes, ref as storageRef, deleteObject } from "firebase/storage";

const deleteItemFromStorage = (keys: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const itemRef = storageRef(storage, `images/${keys}`);

    return deleteObject(itemRef)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const deleteFood = (keys: string) => {
  try {
    remove(ref(db, "food/" + keys));
    deleteItemFromStorage(keys).then(() => {
      // alert("Item food removed");
    });
  } catch (error) {
    throw error;
  }
};

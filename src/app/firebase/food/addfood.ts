import { push, ref as dbRef } from "firebase/database";
import { db, storage } from "..";
import { uploadBytes, ref as storageRef } from "firebase/storage";
import { getCategoryByKey, getImage } from "./getFood";

interface FoodData {
  name: string;
  description: string;
}

export const addFood = (foodData: any, imageFile: File) => {
  return new Promise(async (resolve, reject) => {
    try {
      const foodRef = push(dbRef(db, "food"), foodData);
      const imageKey: string | null = foodRef.key; 

      if (imageKey) {
        const imageRef = storageRef(storage, `images/${imageKey}`);
        uploadBytes(imageRef, imageFile)
          .then(async () => {
            const categoryName = await getCategoryByKey(foodData.category)
            const imageUrl = await getImage(imageKey);
            const response = {
              ...foodData,
              image: imageUrl,
              keys: imageKey,
              category: categoryName,
              categoryKeys: foodData.category
            };
            resolve(response);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        throw new Error("Failed to generate a valid key for the food item");
      }
    } catch (error) {
      console.error("Error adding food:", error);
      // alert("Error uploading food or image");
      reject(error);
    }
  });
};

import { push, ref as dbRef } from "firebase/database";
import { db, storage } from "..";
import { uploadBytes, ref as storageRef } from "firebase/storage";

interface FoodData {
  // Define the structure of your food data
  name: string;
  description: string;
  // Add more fields as needed
}

export const addFood = async (foodData: any, imageFile: File) => {
  try {
    // Push food data to the database
    const foodRef = push(dbRef(db, "food"), foodData);
    const imageKey: string | null = foodRef.key; // Get the key of the newly added food item

    if (imageKey) {
      // Upload image to storage if a valid key is generated
      const imageRef = storageRef(storage, `images/${imageKey}`);
      uploadBytes(imageRef, imageFile).then(() => {
        alert("Food and image uploaded successfully");
      });
    } else {
      throw new Error("Failed to generate a valid key for the food item");
    }
  } catch (error) {
    console.error("Error adding food:", error);
    alert("Error uploading food or image");
  }
};

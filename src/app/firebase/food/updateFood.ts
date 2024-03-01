import { ref, set } from "firebase/database";
import { db, storage } from "..";
import { uploadBytes, ref as storageRef } from "firebase/storage";

export const updateFood = async (newFood: any, imageFile?: File) => {
  try {
    set(ref(db, "food/" + newFood.keys), newFood);

    if (imageFile) {
      const imageRef = storageRef(storage, `images/${newFood.keys}`);
      uploadBytes(imageRef, imageFile)
        .then(() => {
          // alert("image uploaded successfully");
        })
        .catch((error) => {
          throw new error("error in uploading image", error);
        });
    }

    alert("Food updated succesfully");
  } catch (error) {
    console.log("ERROR in updating category", error);
  }
};

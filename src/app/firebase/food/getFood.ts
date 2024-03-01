import { push, ref as dbRef, onValue } from "firebase/database";
import { db, firebaseConfig, storage } from "..";
import {
  uploadBytes,
  ref as storageRef,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import firebase from "firebase/compat/app";

interface FoodData {
  name: string;
  description: string;
}

export const getImage = (imageKey: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const imageRef = storageRef(storage, `images/${imageKey}`);
      getDownloadURL(imageRef)
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
};

export const getCategoryByKey = (key: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const dataRef = dbRef(db, `categories/${key}`);
      onValue(dataRef, (snapshot) => {
        const data = snapshot.val();
        if (data && data.name) {
          resolve(data.name);
        } else {
          reject(new Error("Category data not found"));
        }
      });
    } catch (error) {
      console.log("ERROR in getting category by key", error);
      reject(error);
    }
  });
};

export const fetchFoodData = async () => {
  return new Promise((resolve, reject) => {
    let food: any = [];
    const dataRef = dbRef(db, "food/");
    onValue(
      dataRef,
      async (snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];

            const imageUrl = await getImage(key);
            const category = await getCategoryByKey(value.category);

            const foodData = {
              name: value.name,
              description: value.description,
              price: value.price,
              sizes: value.sizes,
              stock: value.stock,
              cost: value.cost,
              image: imageUrl,
              category: category,
              keys: key,
              categoryKeys: value.category
            };

            food.push(foodData);
          }
        }

        resolve(food); 
      },
      {
        onlyOnce: true, 
      }
    );
  });
};

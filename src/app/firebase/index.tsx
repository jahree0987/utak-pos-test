import { initializeApp } from "firebase/app";
import {
  DatabaseReference,
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { Category } from "./types/Category";
import { CategoryData } from "../category/types/Category";
import { FirebaseStorage, getStorage, uploadBytes } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyA3uWoaZZ3j6qJEEMkAk7RLC8ze-RPffpY",
  authDomain: "pos-utak-test.firebaseapp.com",
  databaseURL:
    "https://pos-utak-test-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pos-utak-test",
  storageBucket: "pos-utak-test.appspot.com",
  messagingSenderId: "796804242944",
  appId: "1:796804242944:web:b6d88862f3a5a793c5c2e5",
};

const basePath =
  "https://pos-utak-test-default-rtdb.asia-southeast1.firebasedatabase.app/category";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase();

export const storage = getStorage(app)
// Reference to the location of your data in the database

export const addCategory = async (categoryData: Category) => {
  try {
    // Push the new category data to the 'categories' node in the database
    const newCategoryRef = await push(ref(db, "categories"), categoryData);
    return newCategoryRef.key;
  } catch (error) {
    console.error("Error adding category:", error);
  }
};

export const updateCategory = async (newData: CategoryData | undefined) => {
  try {
    set(ref(db, "categories/" + newData?.keys), newData);
  } catch (error) {
    console.log("ERROR in updating category", error);
  }
};

export const deleteCategory = (keys: string) => {
  try {
    remove(ref(db, "categories/" + keys));
  } catch (error) {
    console.error("Error removing data: ", error);
  }
};

export const fetchCategory = () => {
  return new Promise((resolve, reject) => {
    let categories: any = [];
    const dataRef = ref(db, "categories/");
    onValue(
      dataRef,
      (snapshot) => {
        const data = snapshot.val();

        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            const value = data[key];

            const categoryData = {
              name: value.name,
              keys: key,
              dateCreated: value.dateCreated,
              description: value.description,
            };

            categories.push(categoryData);
          }
        }

        resolve(categories); // Resolve the promise with the fetched data
      },
      {
        onlyOnce: true, // Read data only once
      }
    );
  });
};





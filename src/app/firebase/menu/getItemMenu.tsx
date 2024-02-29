import { onValue, ref } from "firebase/database";
import { db } from "..";
import { getCategoryByKey, getImage } from "../food/GetFood";

// const fetchSingleFoodData = async (foodKeys: string) => {
//   return new Promise((resolve, reject) => {
//     let food: any = [];
//     const dataRef = ref(db, `food/${foodKeys}`);
//     onValue(
//       dataRef,
//       async (snapshot) => {
//         const data = snapshot.val();

//         console.log('FOOD DATA', data)

//         resolve(food); // Resolve the promise with the fetched data
//       },
//       {
//         onlyOnce: true, // Read data only once
//       }
//     );
//   });
// };

export const fetchItemMenu = async () => {
  return new Promise((resolve, reject) => {
    try {
      let menuItems: any = [];
      const dataRef = ref(db, "menuItems/");
      onValue(
        dataRef,
        (snapshot) => {
          const data = snapshot.val();

          for (const key in data) {
            const value = data[key];

            const singleMenuItem = {
              foodKeys: value.foodKeys,
              menuKeys: value.menuKeys,
              keys: key,
            };

            menuItems.push(singleMenuItem);
          }
          resolve(menuItems); // Resolve the promise with the fetched data
        },
        {
          onlyOnce: true, // Read data only once
        }
      );
    } catch (error) {
      alert("ERROR IN FETCHING MENU ITEMS");
      reject(error);
    }
  });
};

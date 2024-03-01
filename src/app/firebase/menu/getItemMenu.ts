import { onValue, ref } from "firebase/database";
import { db } from "..";



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
      // alert("ERROR IN FETCHING MENU ITEMS");
      reject(error);
    }
  });
};

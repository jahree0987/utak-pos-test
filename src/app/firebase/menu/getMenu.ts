import { onValue, ref } from "firebase/database";
import { db } from "..";

export const fetchMenu = () => {
  return new Promise((resolve, reject) => {
    let categories: any = [];
    const dataRef = ref(db, "menus/");
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
              description: value.description,
            };

            categories.push(categoryData);
          }
        }

        resolve(categories); 
      },
      {
        onlyOnce: true, 
      }
    );
  });
};

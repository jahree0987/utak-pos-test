import * as React from "react";
import styled from "styled-components";
import DeleteIcon from "@/app/category/components/DeletIcon";
import { SingleItem } from "../types/SingleItem";
import AddIcon from "./AddIcon";
import { useMenuContext } from "./context/menuContext";
import { AllMenuItems } from "../types/AllMenuItems";
import { deleteItemFromMenu } from "@/app/firebase/menu/deletItemFromMenu";

export default function SingleItem({
  item,
  type,
  menuKeys,
}: {
  item: AllMenuItems;
  type?: string | undefined;
  menuKeys?: string | undefined;
}) {
  const {
    selectedMenu,
    addFoodToMenu,
    removeItemFromMenuArray,
    allMenu,
    setAllMenu,
    addItemsMenu,
    setAllMenuItems,
    allMenuItems,
    addFoodToMenuItemArray,
  } = useMenuContext();
  const [close, setClose] = React.useState(false);
  const handleAddtoMenu = async () => {
    const newArray = addItemsMenu(allMenu, selectedMenu, item);
    await addFoodToMenu(selectedMenu, item.keys);
    setClose(true);
  };
  const handleDeleteItemMenu = async () => {
    const newArray = removeItemFromMenuArray(allMenu, item.menuItemID);
    setAllMenu(newArray);
    await deleteItemFromMenu(item.menuItemID);
    setClose(true)
  };
  return (
    <>
      {!close && (
        <Div Ztype={type === "modal" ? "modal" : null}>
          <img
            className="image"
            src={item.image}
            width={type === "modal" ? 110 : 200}
            height={type === "modal" ? 110 : 200}
            alt="food"
          />
          <Div2 Ztype={type === "modal" ? "modal" : null}>{item.name}</Div2>
          {type === "modal" ? null : <Separator></Separator>}
          <Div3 Ztype={type === "modal" ? "modal" : null}>$ {item.price}</Div3>
          <Div4 Ztype={type === "modal" ? "modal" : null}>
            {item.stock} Bowls available
          </Div4>
          {type === "modal" ? (
            <button type="button" onClick={handleAddtoMenu}>
              <AddIcon />
            </button>
          ) : (
            <button type="button" onClick={handleDeleteItemMenu}>
              <DeleteIcon />
            </button>
          )}
        </Div>
      )}
    </>
  );
}

const Separator = styled.div`
  margin-top: 20px;
  background-color: blue;
  height: 40px;
`;
const Div = styled.div<{ Ztype: string | null }>`
  border-radius: 16px;
  background-color: ${(props) =>
    props.Ztype === "modal" ? "#FFFFFF" : "rgba(98, 185, 192, 1)"};
  display: flex;
  width: ${(props) => (props.Ztype === "modal" ? "200px" : "400px")};
  flex-direction: column;
  align-items: center;
  padding: 0 24px 24px;
  margin-top: 30px;

  height: ${(props) => (props.Ztype === "modal" ? "220px" : "420px")};
  .image {
    aspect-ratio: 1.09;
    object-fit: auto;
    object-position: center;
    margin-top: -60px;
    border-radius: 100px;
  }
  button {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const Div2 = styled.div<{ Ztype: string | null }>`
  color: var(--White, #fff);
  font-family: Barlow, sans-serif;
  font-weight: 700;
  line-height: 30px;
  font-size: ${(props) => (props.Ztype === "modal" ? "15px" : "40px")};
  align-self: stretch;
  margin-top: 16px;
  color: ${(props) => (props.Ztype === "modal" ? "#62B9C0" : "")};
`;

const Div3 = styled.div<{ Ztype: string | null }>`
  font-family: Barlow, sans-serif;
  font-weight: 900;
  white-space: nowrap;
  color: ${(props) => (props.Ztype === "modal" ? "#62B9C0" : "white")};

  margin-top: ${(props) => (props.Ztype === "modal" ? "20px" : "80px")};
  font-size: ${(props) => (props.Ztype === "modal" ? "12px" : "25px")};
`;

const Div4 = styled.div<{ Ztype: string | null }>`
  font-family: Barlow, sans-serif;
  font-weight: 400;
  margin-top: 20px;
  white-space: nowrap;
  color: var(--White, #fff);
  margin-bottom: 20px;
  font-size: ${(props) => (props.Ztype === "modal" ? "12px" : "")};
  color: ${(props) => (props.Ztype === "modal" ? "#62B9C0" : "")};
`;

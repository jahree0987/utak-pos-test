import * as React from "react";
import styled from "styled-components";

export default function AddFoodMenuButton({
  onClick,
  menuName,
}: {
  onClick: () => void;
  menuName: string;
}) {
  return (
    <Div onClick={onClick}>
      <Div3> +</Div3>
      <Div2> Add food to {menuName} menu </Div2>
    </Div>
  );
}

const Div3 = styled.div`
  font-size: 70px;
`;
const Div = styled.div`
  border-radius: 10px;
  border: 1px dashed #6c6c6c;
  background-color: #dedede;
  display: flex;
  width: 400px;
  flex-direction: column;
  font-size: 16px;
  color: #878282;
  font-weight: 400;
  text-align: center;
  letter-spacing: 0.15px;
  line-height: 28px;
  padding: 50px 43px;
  justify-content: center;
  gap: 30px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s; /* Add transition effect */

  border: 3px solid transparent; /* Set the border width */
  border-image: linear-gradient(
    to right,
    #A2D7AE 33%,
    transparent 33%,
    transparent 66%,
    #A2D7AE 66%,
    #A2D7AE 100%
  );
  border-image-slice: 1; /* Ensure that the slices are equal */

  &:hover {
    background-color: #bcbcbc; /* Change the background color on hover */
    color: #000; /* Change the text color on hover */
    border-color: #000; /* Change the border color on hover */
  }
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
  align-self: center;
  margin-top: 34px;
`;

const Div2 = styled.div`
  font-family: Roboto, sans-serif;
  margin-top: 16px;
  font-size: 30px;
`;

import * as React from "react";
import styled from "styled-components";

export default function AddMenuButton({ onClick }: { onClick: () => void }) {
  return <Div onClick={onClick}>+ Add menu</Div>;
}

const Div = styled.div`
  border-radius: 7px;
  background-color: #62b9c0;
  max-width: 224px;
  justify-content: center;
  align-items: center;
  color: #fffafa;
  white-space: nowrap;
  letter-spacing: 0.1px;
  font: 500 14px/157% Roboto, sans-serif;
  margin: auto;
  text-align: center;
  padding: 20px;
  margin-bottom: 30px;
  cursor: pointer;
`;

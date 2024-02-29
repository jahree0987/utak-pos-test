import * as React from "react";
import styled from "styled-components";

export default function ClearButton({ onClick }: { onClick: any }) {
  return (
    <Div type="button" onClick={onClick}>
      <Img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/e8e0f99b4004e27be6b83dda3f74049fb953fc8997fdb225b9142550b483a01e?"
      />
      <Div2>clear</Div2>
    </Div>
  );
}

const Div = styled.button`
  cursor: pointer;
  border-radius: 6px;
  background-color: #0da086;
  display: flex;
  gap: 4px;
  font-size: 12px;
  color: #000;
  font-weight: 400;
  white-space: nowrap;
  letter-spacing: 1px;
  line-height: 266%;
  padding: 0 10px;
  width: 90px;
  margin: auto;
  margin-bottom: 20px;

  &:hover {
    background-color: #45a049; /* Darker green */
  }

  &:active {
    background-color: #3e8e41;
    transform: translateY(2px);
  }
`;

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 24px;
  margin-top: 4px;
`;

const Div2 = styled.div`
  flex-grow: 1;
  margin: auto 0;
`;

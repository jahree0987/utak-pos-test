import * as React from "react";
import styled from "styled-components";

export default function FoodIcon() {
  return (
    <Img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/668302760b6daace8b12a98c2177bad96a0ac97a0bf4fd4ccc8e14d7b63389e8?"
    />
  );
}

const Img = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 100%;
  max-width: 24px;
`;

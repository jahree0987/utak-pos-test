import * as React from "react";
import styled, { keyframes } from "styled-components";

export default function AddIcon() {
  return (
    <StyledImg
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/38ac1d781b7908891693533af622bb74f946a70012034769336c3ed6d09bf9a8?"
    />
  );
}



const StyledImg = styled.img`
  aspect-ratio: 1;
  object-fit: auto;
  object-position: center;
  width: 100%;
  fill: #f41a1a;
  max-width: 18px;
  cursor: pointer;

  /* Hover effect */
  transition: transform 0.3s ease; /* Add transition for smooth effect */

  &:hover {
    transform: scale(3.1); /* Increase size on hover */
  }
`;


import * as React from "react";
import styled, { keyframes } from "styled-components";

export default function DeleteIcon() {
  return (
    <StyledImg
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/1c851b614ee66fe0064fa6d43883b440584286a4d28c067ac134770aefedcca9?"
    />
  );
}

const shakeAnimation = keyframes`
  0% { transform: translateX(0) scale(1); }
  25% { transform: translateX(-2px) scale(1.1); }
  50% { transform: translateX(2px) scale(1.1); }
  75% { transform: translateX(-2px) scale(1.1); }
  100% { transform: translateX(0) scale(1); }
`;

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

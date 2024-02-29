import * as React from "react";
import styled from "styled-components";

export default function EditIcon() {
  return (
    <StyledImg
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/0396a1380eb92011e21e5cd3f752f5ae5f9861e54c4275116d3decf0cb4c0221?"
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

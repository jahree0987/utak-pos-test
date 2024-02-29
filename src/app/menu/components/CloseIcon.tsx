import * as React from "react";
import styled from "styled-components";

export default function CloseIcon() {
  return (
    <StyledImg
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/f47a164fe2ba7c8606510a60c63e9322bc54cd7c8650e339ac3a53e3614536bb?"
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

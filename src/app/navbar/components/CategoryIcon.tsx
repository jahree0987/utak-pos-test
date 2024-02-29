import * as React from "react";
import styled from "styled-components";

function CategoryIcon() {
  return (
    <Img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/c034f2401fd8b2b6f2870ee82c7c648ea6cb614caf31ee81a7df5777fb7831c4?"
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

export default CategoryIcon

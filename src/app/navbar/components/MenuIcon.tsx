import * as React from "react";
import styled from "styled-components";

export default function MenuIcon() {
  return (
    <Img
      loading="lazy"
      src="https://cdn.builder.io/api/v1/image/assets/TEMP/d379371f7b18884fb9727aab2ad584791d1e5287b27663bc477027305145503a?"
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

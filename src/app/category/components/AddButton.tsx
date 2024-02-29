import React from 'react';
import styled from 'styled-components';

// Styled button component
const StyledButton = styled.button`
  background-color: #015042; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: auto;
  margin-top: 30px;
  cursor: pointer;
  border-radius: 8px;
  transition-duration: 0.4s;
  width: 20%;

  &:hover {
    background-color: #45a049; /* Darker green */
  }

  &:active {
    background-color: #3e8e41;
    transform: translateY(2px);
  }
`;

function AddButton(props:any) {
  return (
    <StyledButton onClick={props.onClick}>
      {props.children}
    </StyledButton>
  );
}

export default AddButton;

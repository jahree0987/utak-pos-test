import styled from "styled-components";

export default function InputTextField({
  placeholder,
}: {
  placeholder: string;
}) {
  return (
    <Div7>
      <input type="text" placeholder={placeholder}></input>
    </Div7>
  );
}
const Div7 = styled.div`
  input {
    width: 100%;
    border-radius: 15px;
    border: 1px solid #a2d7ae;
    background-color: #fff;
    margin-top: 16px;
    justify-content: center;
    align-items: start;
    color: #909090;
    white-space: nowrap;
    padding: 20px 60px 20px 20px;
    font: 400 14px/137% Roboto, sans-serif;
    @media (max-width: 991px) {
      white-space: initial;
      padding-right: 20px;
    }
  }
  input:focus {
    outline: none; /* Removes the default focus outline */
    border-color: #015042; /* Hides the border when focused */
  }
`;

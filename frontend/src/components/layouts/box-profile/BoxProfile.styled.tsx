import styled from "styled-components";

export const StyledBoxProfile = styled.div`
  position: absolute;
  top: 59px;
  left: -155px;
  width: 200px;
  border: 1px solid black;
`;

export const StyledInnerBoxProfile = styled.div`
  position: absolute;
  top: 60px;
  left: -155px;
  width: 200px;
  border: 1px solid black;
  border-radius: 0 0 5px 5px;
  border-top: none;
  background-color: white;
  text-align: center;
  padding-top: 1em;
  z-index: 1;

  & a {
    display: block;
    border-top: 1px solid black;
    padding: 0.4em;
    font-weight: bolder;
    transition: 0.4s;
  }
  & a:hover {
    background-color: black;
    color: white;
  }
`;

export const StyleTriangleBoxProfile = styled.div`
  position: absolute;
  top: 26px;
  left: 2px;
  width: 0;
  height: 0;
  border-bottom: 27px solid transparent;
  border-top: 27px solid transparent;
  border-right: 27px solid black;
  z-index: 1;

  transform: rotate(90deg);

  & .borders {
    width: 0;
    height: 0;
    border-bottom: 25px solid transparent;
    border-top: 25px solid transparent;
    border-right: 25px solid white;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(5%, -50%);
  }
`;

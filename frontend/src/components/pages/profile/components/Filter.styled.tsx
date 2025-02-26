import styled from "styled-components";

export const StyledFilter = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid black;

  & .itens {
    border-left: 1px solid black;
    padding: 1em;
  }
`;

export const StyledH1 = styled.h1`
  width: 20%;
  text-align: center;
`;

export const StyledInput = styled.input`
  width: 100%;
  border-radius: 10px;
  font-size: 1em;
  padding: 0.6em 2em;
  background-color: #e7e4e4;
  border: 1px solid gray;
  outline: none;
`;

export const StyledFilterSearch = styled.div`
  position: relative;
  width: 50%;

  & svg {
    position: absolute;
    top: 25px;
    left: 25px;
    font-size: 1.2em;
    color: gray;
  }
`;

export const StyledConteineFilterSort = styled.div`
  width: 30%;
  display: flex;
  justify-content: space-around;
`;

export const StyledOption = styled.select`
  padding: .8em .3em;
  width: 125px;
  border: 1px solid black;
  background-color: #e7e4e4;
  outline: none;
`;

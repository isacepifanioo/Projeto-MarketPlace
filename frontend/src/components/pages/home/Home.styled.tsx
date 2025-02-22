import styled from "styled-components";

interface Props {
  $img: string;
}

// conteine principal -> section
export const StyledConteineSection = styled.section`
  & h1 {
    text-align: center;
    background-color: white;
    border-bottom: 5px solid black;
    margin-bottom: 4em;
    padding: 0.5em;
    -webkit-box-shadow: 4px 3px 12px -3px rgba(0, 0, 0, 0.29);
    -moz-box-shadow: 4px 3px 12px -3px rgba(0, 0, 0, 0.29);
    box-shadow: 4px 3px 12px -3px rgba(0, 0, 0, 0.29);
  }
`;

// img -> banner com varias logo
export const BoxStyled = styled.div<Props>`
  width: 100%;
  height: 400px;
  background-color: #333;
  border-radius: 30px;
  margin-bottom: 4em;

  & .img {
    width: 100%;
    height: 400px;
    background-image: ${({ $img }) => ($img ? `url("${$img}")` : "")};
    background-size: cover;
    background-position: center;
    border-radius: 30px;
  }
`;

// conteine de todos os produtos

export const StyledConteineItens = styled.div`
  display: flex;
  gap: 1em;
  width: 100%;
  flex-wrap: wrap;
  justify-content: center;
`;

// iten



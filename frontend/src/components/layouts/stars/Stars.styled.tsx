import styled from "styled-components";

export const ConteineStars = styled.div`
  font-size: 1.3em;
  display: flex;

  & .color {
    color: #ffd700;
  }

  & .halfColor {
    background: linear-gradient(90deg, #ffd700 50%, #ccc 50%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

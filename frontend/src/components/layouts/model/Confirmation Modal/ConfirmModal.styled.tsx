import styled from "styled-components";

interface Props {
  $backgroundColor?: string;
  $color?: string;
  $borderColor?: string;
  $seeMore?: boolean;
}

export const ConteinedarkBack = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #00000076;
  height: 100%;
  width: 100vw;

  z-index: 1;
`;

export const ConteineConfirmModal = styled.div`
  position: fixed;
  top: 50%;
  width: 800px;
  left: 50%;
  transform: translate(-50%, -50%);

  background-color: #fafafa;
  color: #333;
  border: 2px solid gray;
  border-radius: 10px;
  padding: 2em;
  z-index: 1;
`;

export const InnerConfirmModal = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1em;
  margin: 0 auto;
  width: 80%;
`;

export const Styledh2 = styled.h2`
  font-size: 1.5em;
  text-align: center;
`;

export const StyledConteineBtn = styled.div`
  display: flex;
  gap: 1em;
  justify-content: space-between;
`;

export const StyledBtn = styled.button<Props>`
  width: 100%;
  padding: 0.8em;
  font-weight: bold;
  background-color: transparent;
  color: ${({ $color }) => ($color ? $color : "#333")};
  border: 1px solid
    ${({ $borderColor }) => ($borderColor ? $borderColor : "#333")};
  border-radius: 4px;
  font-size: 1em;
  transition: 0.2s linear;

  &:hover {
    background-color: ${({ $backgroundColor }) =>
      $backgroundColor ? $backgroundColor : "#333"};
    color: white;
  }
`;

export const StyledInforProducts = styled.div`
  text-align: start;
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  word-break: break-all;
`;

export const StyledDescription = styled.p<Props>`
  ${({ $seeMore }) =>
    $seeMore
      ? `mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  -webkit-mask-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 1),
    rgba(0, 0, 0, 0)
  )`
      : "color: #333"}
`;

export const StyledConteineSeeMore = styled.div`
  position: relative;

  & span::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    border-bottom: 1px solid black;
    width: 100%;
    height: 10px;
    z-index: 0;
  }
`;

export const StyledSeeMore = styled.p`
  position: relative;
  text-align: center;
  background-color: white;
  width: 100px;
  z-index: 1;
  margin: 0 auto;
  cursor: pointer;
`;

import styled from "styled-components";
import ImgNotFoud from "../../../../../public/imagem-not-foud.webp";

interface Props {
  $img?: string;
}

export const StyledConteineInfor = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5em;

  & .inforProducts {
    display: flex;
    flex: 1;
    text-align: start;
    flex-direction: column;
    gap: 0.3em;
    word-break: break-all;
    & h1 {
      text-align: start;
      
    }
  }

  & .conteineDescription {
    margin-top: 0.5em;
    height: 150px;
    overflow-y: scroll;
    word-wrap: break-word;
    overflow-wrap: break-word;
    overflow-x: hidden;

    & p {
      word-break: break-all;
    }
  }
`;

export const StyledConteineImg = styled.div`

  position: relative;

  & .mdDelete {
    position: absolute;
    right: 5px;
    top: 5px;
    font-size: 1.5em;
    color: #333;
    background-color: #EDEDED;
    border-radius: 3px;
  }

  & .ArrowBack {
    position: absolute;
    color: darkgray;
    font-size: 3em;
    top: 50%;
    left: 5px;
    transform: translate(0, -50%);
    border-radius: 50%;
    background-color: #333;
  }

  & .ArrowForward {
    position: absolute;
    color: darkgray;
    font-size: 3em;
    top: 50%;
    right: 5px;
    transform: translate(0, -50%);
    border-radius: 50%;
    background-color: #333;
  }

  & .hidden {
    display: none;
  }

`

export const StyledImg = styled.div<Props>`
  border-radius: 5px;
  width: 300px;
  height: 300px;
  margin-bottom: 1em;

  background-image: ${({ $img }) =>
    $img ? `url("${$img}")` : `url("${ImgNotFoud}")`};
  background-position: center;
  background-size: cover;
`;

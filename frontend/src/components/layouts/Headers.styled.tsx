import styled from "styled-components";

interface Props {
  $Imgprofile?: string
}

export const StyledInnerHeaders = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1em;

  & .conteineLogo {
    display: flex;
    align-items: center;

    & svg {
      font-size: 3em;
    }

    & h1 {
      font-family: "Alfa Slab One", serif;
      font-weight: 400;
      font-style: normal;
      font-size: 3em;
      margin-right: 1em;
      margin-top: .18em;
    }
  }

  & .conteineLiks {
    height: 100%;
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  & .navBar {
    display: flex;
    padding-top: 1em;
    gap: 1em;
  }

  & .navBar a {
    text-decoration: none;
    color: #3d3b3b;
  } 

  & .box-Links {
    position: relative;
    display: flex;
    gap: 0.3em;
    align-items: center;
    cursor: pointer;

    & svg{
        font-size: 1.3em;
        margin-bottom: .25em;
    }
  }
`;

export const StyledHeaders = styled.header`
  width: 100%;
  height: 5em;
`;


export const StyledProfileIcon = styled.div<Props>`

  width: 30px;
  height: 30px;
  background-image: ${({ $Imgprofile }) => $Imgprofile && `url("${$Imgprofile}")`};
  background-size: cover;
  border-radius: 50%;
  border: 1px solid black;

`
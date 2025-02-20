import styled from "styled-components";

export const ConteineAuth = styled.div`
  position: relative;
  width: 30%;
`;

export const ConteineBody = styled.div`
    position: relative;
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;


export const ConteineBtn = styled.div`

    
    position: absolute;
    top: 0;
    left: 20%;
    display: flex;
    gap: 1em;
    
    & p {
        border:  1px solid black;
        border-top: none;
        padding: .5em 1em;
        font-weight: bold;
        border-radius: 0px 0px 10px 10px;
        transition: .4s;
    }

    & .active {
        background-color: black;
        color: white;
    }

`
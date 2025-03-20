import styled from "styled-components";

export const StyledError = styled.div`

    position: fixed;
    box-shadow: 2px 2px 5px #00000030;
    color: #ff6961;
    background-color: #fafafa;
    border: 1px solid black;
    border-radius: 5px;

    z-index: 1;

    top: 5%;
    right: 30%;
    transform: translate(50%, 50%);

    & p {
        padding: 1em;
        width: 100%;
    }

    & .conteineProgressError {
        border-top: 1px solid black;
    }

    & .currentProgress {
        background-color: red;
        width: 100%;
        height: 10px;
        border-radius: 0 0 3px 3px;
        transition: .4s;
    }

`
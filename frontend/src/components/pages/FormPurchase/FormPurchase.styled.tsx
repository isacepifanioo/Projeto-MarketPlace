import styled from "styled-components";

export const ConteineInputs = styled.div`

    /* background-color: #333; */
    position: relative;
    width: 60%;
    align-self: center;

    & .addImg {
        padding: 0.4em 0.7em;
        font-size: 1.2em;
        border-radius: 10px;
        border: 1px solid black;
        background-color: #333;
        border-radius: 5px;
        color: #fafafa;
        text-align: center;
    }

    & input {
        text-align: center;
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        border-radius: 5px;
    }

`
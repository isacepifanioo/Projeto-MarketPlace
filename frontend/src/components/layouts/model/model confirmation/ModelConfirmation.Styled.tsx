import styled from "styled-components";

export const StyledModelConfirmation = styled.div`

    position: absolute;
    top: 2em;
    left: 50%;
    transform: translate(-50%, 0);

    background-color: white;
    border: 1px solid black;
    padding: 1em;
    border-radius: 10px;

    display: flex;
    flex-direction: column;
    gap: .5em;
    text-align: center;

`

export const StyledConteineBtn = styled.div`

    display: flex;
    gap: 1em;

    & button {
        width: 100%;
        padding: .5em;
        font-size: 1em;
        border: none;
        font-weight: bold;
        border-radius: 5px;
        transition: .3s;
        cursor: pointer;
    }
    
    & .btnS {
        background-color: #6495ED;
        color: white;
    }
    & .btnS:hover {
        background-color: #417dc1;
        color: white;
    }

    & .btnN {
        background-color: #ebe7e7c8;
        color: black;
    }
    & .btnN:hover {
        background-color: #F8D7DA;
        color: #721C24 ;
    }

`
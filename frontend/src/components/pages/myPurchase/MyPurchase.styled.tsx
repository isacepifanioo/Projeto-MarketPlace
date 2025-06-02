import styled from "styled-components";

export const ConteineInfor = styled.div`

    border-radius: 5px;
    border: 1px solid #333;
    padding: 1em;

    display: flex;
    justify-content: space-between;
    margin-bottom: .5em;
    margin-top: 1em;

`

export const ConteineBtn = styled.div`
    display: flex;
    gap: 1em;
    margin-left: .3em;

    & a {
        text-decoration: none;
        font-weight: bold;
        background-color: #333;
        padding: .7em;
        border-radius: 5px;
        color: #fafafa;
        cursor: pointer;
    }

` 
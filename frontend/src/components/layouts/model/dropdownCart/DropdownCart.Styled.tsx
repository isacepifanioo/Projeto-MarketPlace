import styled from "styled-components";

interface Props {
    $img: string
}

export const ConteineDropDown = styled.div`

    position: fixed;
    background-color: white;
    height: 100%;
    width: 500px;
    right: 0;
    transition: 0.2s ease-in-out;
    border-left: 1px solid #333;
    z-index: 10;

`

export const ConteineItens = styled.div`

    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    /* margin-bottom: 12em; */
    position: relative;
    height: 92%;
    overflow-y: auto;

    & a {
        text-decoration: none;
        border: 1px solid black;
        border-radius: 5px;
        padding: 1em;
        display: flex;
        align-items: center;
        gap: 1em;
    }

`

export const ImgItensCart = styled.div<Props>`

    width: 70px;
    height: 70px;
    border-radius: 5px;
    background-image: ${({ $img }) => ($img ? `url("${$img}")` : "")};
    background-repeat: no-repeat;
    background-size: contain;
    background-position: center;
    border: 1px solid #333;
`


export const ConteineTitle = styled.div`

    display: flex;
    flex-direction: column;
    gap: .2em;
    color: #333;

    h3 {
        font-size: 1.2em;
    }

    h6 {
        font-size: .9em;
    }

`

export const ConteineQtyProduct = styled.div`

    display: flex;
    align-items: center;
    gap: 2em;
    border: 1px solid black;
    width: 108px;

    & button {
        border: none;
        padding: .4em;
        background-color: #333;
        color: #fafafa;
        cursor: pointer;
    }

`

export const ConteineControllerBuy = styled.div`

    position: absolute;
    bottom: 0;
    background-color: #fafafa;
    width: 100%;
    height: 50px;
    border-top: 1px solid #333;
    display: flex;
    gap: 1em;
    align-items: center;
    justify-content: center;

    & h2 {
        font-size: 1em;

        & span {
            font-size: 2rem;
        }
    }

    & button {
        padding: .6em;
        border-radius: 5px;
        border: none;
        background-color: #333;
        color: #fafafa;
    }

`
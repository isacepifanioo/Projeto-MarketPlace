import styled from "styled-components";

interface Props {
    $img: string
}

export const ConteineComfirm = styled.div<Props>`
    text-align: center;
    display: flex;
    flex-direction: column;
    gap: 1em;
    align-items: center;

    & .img {
        height: 400px;
        width: 400px;
        background-image: ${({ $img }) =>
        $img && `url("${$img}")`};
        background-position: center;
        background-size: cover;
    }

    & button {
        width: 50%;
        font-size: 1em;
        padding: .5em;
        border-radius: 5px;
        border: 1px solid #333;
        font-weight: bolder;
    }

`
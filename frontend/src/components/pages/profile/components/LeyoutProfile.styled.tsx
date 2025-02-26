import styled from "styled-components";

interface Props {
    $img: string
}

export const StyledProfile = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #e7e4e4;
  padding: 1em;
  border-radius: 10px;

  & .icon-edit {
    font-size: 1.5em;
  }
`;

export const StyledConteineProfile = styled.div`

    display: flex;
    align-items: self-end;
    gap: .5em;

    & .data {
        & h1 {
            font-size: 3em;
            font-style: italic;
            text-transform: capitalize;
        }

        & p {
            font-size: 1.2em;
            margin-left: .4em;
        }
        & span {
        font-weight: bold;
        }
    }

`


export const StyledProfileImg = styled.div<Props>`

    background-image: ${({ $img }) => $img ? `url(${$img})` : ''};
    background-size: cover;
    min-width: 200px;
    min-height: 200px;
    border-radius: 50%;
    border: 1px solid #333;

`

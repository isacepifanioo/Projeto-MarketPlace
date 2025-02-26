import styled from "styled-components";
interface Props {
    $img: string
}

export const StyledItens = styled.div`
  flex-basis: 280px;
  height: 350px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  padding: 0.2em;


  & .placeholder {
    width: 100%;
  }
`;

export const StyledItensImg = styled.div<Props>`
  background-image: ${({ $img }) => ($img ? `url("${$img}")` : "")};
  background-color: lightgray;
  background-size: cover;
  background-position: center;
  border-radius: 5px;
  height: 85%;
  margin-bottom: 0.5em;
`;

export const StyledItensConteineInforProduct = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
`;

export const StyledItensInforProduct = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.1em;
  color: #333;
  font-size: 1.2em;

  & p {
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }

  & span {
    font-weight: bold;

    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS",
      sans-serif;
  }
`;

export const StyledItensConteineBag = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35px;
  height: 35px;
  border: 2px solid black;
  border-radius: 50%;
  padding: 0.2em;

  & svg {
    font-size: 1.3em;
  }
`;
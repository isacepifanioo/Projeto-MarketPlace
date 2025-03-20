import styled from "styled-components";

interface Props {
  $img?: string;
}

export const StyledConteineList = styled.div`
position: relative;
  display: flex;
  flex-direction: column;
  gap: 1em;

  z-index: 0;
  word-break: break-all;
  
`;

export const StyledConteineProduct = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #e7e4e4;
  border-radius: 15px;
  padding: 0.7em;

  & .conteineBtn {
    display: flex;
    gap: 1em;
  }
`;

export const StyledInforProduct = styled.div`
  display: flex;
  align-items: center;
  gap: 1em;
`;

export const StyledProductImg = styled.div<Props>`
  background-image: ${({ $img }) => ($img ? `url("${$img}")` : "")};
  background-position: center;
  background-size: cover;
  border-radius: 10px;

  width: 75px;
  height: 75px;
`;
export const StyledConteineStars = styled.div`
  display: flex;
`;

export const StyledStars = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3em;

  & p {
    margin-top: .3em;
  }
`;

export const StyledLButton = styled.button`
   display: flex;
  align-items: center;
  justify-content: center; 
  text-align: center;
  width: 70px;
  font-size: 1.5em;
  background-color: transparent;
  color: #333;
  border: none;
  height: 70px;
  transition: 0.4s;
  border-radius: 10px; 

  & a {
    align-content: center;
    color: #333;
    width: 100%;
    height: 100%;
  }

  &:hover {
    background-color: #333;
    /* background-color: darkgray; */
    color: #fafafa;
    & a:hover {
      color: #fafafa;
    }
  }
`;

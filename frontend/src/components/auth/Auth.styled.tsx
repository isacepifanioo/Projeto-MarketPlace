import styled from "styled-components";

interface FormProps {
  $active?: boolean;
  $loading?: boolean;
  $Auth?: Auth;
  $img?: string;
}

enum Auth {
  Resgister,
  Login,
}

export const StyledForm = styled.form<FormProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: ${({ $active }) =>
    $active ? "translate(-50%, -50%)" : "translate(100%, -50%)"};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 1em;
  transition: transform 0.5s ease, opacity 0.5s ease;

  & h1 {
    margin-bottom: 0.5em;
    font-size: 3em;
  }

  & input {
    margin-bottom: 1em;
  }
`;

export const StyledInputsBox = styled.div`
  display: flex;
  position: relative;

  & svg {
    position: absolute;
    font-size: 1.8em;
    left: 93%;
    bottom: 0.7em;
    padding: 0.1em;
  }

  & p {
    position: absolute;
    bottom: -5px;
    color: #ff6961;
    font-size: 0.8em;
  }
`;
export const StyledFileBox = styled.div`
  position: relative;
  margin-bottom: 2em;

  & p {
    position: absolute;
    left: 50%;
    bottom: -30%;
    transform: translate(-50%, -50%);
    /* bottom: -25px; */
    color: #ff6961;
    font-size: 0.8em;
    width: max-content;
  }
`;

export const StyledButtonSubmit = styled.button<FormProps>`
  width: 30%;
  height: 47.63px;
  padding: 0.7em;
  align-self: ${({ $Auth }) => ($Auth === 0 ? "flex-end" : "")};
  font-size: 1.1em;
  border-radius: 5px;
  border: none;
  color: white;
  background-color: ${({ $loading }) => ($loading ? "white" : "black")};
  font-weight: bold;
  border: 1px solid black;
  transition: 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: white;
    color: black;
    border: 1px solid black;
  }
`;

export const StyledConteineFile = styled.div<FormProps>`
  position: relative;
  border: 1px solid black;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
  align-self: center;
  margin: 0 auto;
  background-image: ${({ $img }) =>
    $img
      ? `url(${$img})`
      : "url('https://preview.redd.it/l0ergarfzst61.png?auto=webp&s=5de076eac09bb645d58b11cd8ce82f99ec487329')"};
  background-position: center;
  background-size: cover;
`;

export const StyledIconeOfConteine = styled.div`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 70%;
  left: 70%;
  border-radius: 50%;
  background-color: #fafafa;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;

  & img {
    width: 75%;
  }
`;

export const StyledInputFile = styled.input`
  width: 35px;
  height: 35px;
  position: absolute;
  top: 70%;
  left: 70%;
  border-radius: 50%;
  opacity: 0;
`;

export const StyledConteineDate = styled.div`
  position: relative;

  & .error {
    position: absolute;
    bottom: -20px;
    color: #ff6961;
    font-size: .8em;
  }
`;

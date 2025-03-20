import styled from "styled-components";

export const StyledConteine = styled.div`

  & h1 {
    text-align: center;
  }
`;

export const StyledInput = styled.input`
  padding: 0.4em 0.7em;
  font-size: 1.2em;
  border-radius: 10px;
  border: 1px solid black;
  width: 100%;
  background-color: #fafafa;
`;
export const StyledTextarea = styled.textarea`
  padding: 0.4em 0.7em;
  font-size: 1.2em;
  border-radius: 10px;
  height: 200px;
  background-color: #fafafa;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1em;
  flex: 1;

  & .conteineInputs {
    position: relative;

    & input {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
        border-radius: 5px;
    }

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
  }
`;

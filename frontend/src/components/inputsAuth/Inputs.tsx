import React from "react";
import { StyledInputs } from "./Inputs.styled";

interface Props {
  type: string;
  name: string;
  placeholder: string;
  handleOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Inputs = ({ type, name, placeholder, handleOnChange }: Props) => {
  return (
    <>
        <StyledInputs
          type={type}
          name={name}
          placeholder={placeholder}
          onChange={(e) => handleOnChange(e)}
        />
    </>
  );
};

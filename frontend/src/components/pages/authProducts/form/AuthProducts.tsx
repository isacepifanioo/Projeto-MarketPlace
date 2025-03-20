import React from "react";
import {
  StyledConteine,
  StyledForm,
  StyledInput,
  StyledTextarea,
} from "./AuthProducts.styled";
import { StyledButtonSubmit } from "../../../auth/Auth.styled";

export interface Data {
  img: Blob[];
  name: string;
  price: number;
  description: string;
}

interface Props {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  handlePostSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

export default function AuthProducts({ setData, handlePostSubmit }: Props) {
  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { value, name } = e.target;

    setData((prevent) => ({
      ...prevent,
      [name]: typeof value === "string" ? value.trim() : value,
    }));
  }

  function handleOnChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    const { files, name } = e.target as HTMLInputElement;
    if (!files || files.length === 0) return;

    if (files && files.length > 0) {
      setData((prevent) => ({
        ...prevent,
        [name]: [...prevent.img, files[0]],
      }));
    }
  }
  return (
    <StyledConteine>
      <StyledForm onSubmit={(e) => handlePostSubmit(e)}>
        <div className="conteineInputs">
          <input type="file" name="img" onChange={handleOnChangeFile} />
          <div className="addImg">Escolhas suas imagens</div>
        </div>
        <StyledInput
          type="text"
          placeholder="Nome"
          name="name"
          onChange={handleOnChange}
          minLength={10}
          maxLength={255}
        />
        <StyledInput
          type="text"
          placeholder="Preço"
          name="price"
          onChange={handleOnChange}
          maxLength={12}
          onInput={(e) => {
            e.currentTarget.value = e.currentTarget.value
              .replace(/[^0-9,]/g, "")
              .replace(/,+/g, ",")

            let value = e.currentTarget.value

            const parts = value.split(',')
            
            let int = parts[0] || ''
            let float = parts[1] || ''

            int = int.replace(/\D/g, "").slice(0, 7);
            int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ".")
            
            if(parts.length > 1) {
              float = float.slice(0, 2)
              value = `${int},${float}`
            } else {
              value = int
            }

            e.currentTarget.value = value;
          }}
        />
        <StyledTextarea
          name="description"
          placeholder="Escreva mais informações sobre o produto"
          onChange={handleOnChange}
        />
        <StyledButtonSubmit type="submit" style={{ width: "100%" }}>
          Cria Produto
        </StyledButtonSubmit>
      </StyledForm>
    </StyledConteine>
  );
}

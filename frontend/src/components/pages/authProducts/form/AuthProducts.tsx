import React, { useEffect, useRef, useState } from "react";
import {
  StyledConteine,
  StyledForm,
  StyledInput,
  StyledTextarea,
} from "./AuthProducts.styled";
import { StyledButtonSubmit } from "../../../auth/Auth.styled";
import { ModelConfirmation } from "../../../layouts/model/model confirmation/ModelConfirmation";
export interface Data {
  img: Blob[];
  name: string;
  price: string;
  description: string;
}

interface Props {
  setData: React.Dispatch<React.SetStateAction<Data>>;
  handlePostSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  nameBtn: string,
  data?: Data
}

export default function AuthProducts({ setData, handlePostSubmit, data, nameBtn }: Props) {
  const nameRef = useRef<HTMLInputElement>(null)
  const priceRef = useRef<HTMLInputElement>(null)
  const descriptionRef = useRef<HTMLTextAreaElement>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  useEffect(() => {
    if(data) {
      
      if(data.name) {
        nameRef!.current!.value = data.name
      }
      if(data.price) {
        priceRef!.current!.value = data.price
      }

      if(data.description) {
        descriptionRef!.current!.value = data.description
      }

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.name, data?.price, data?.description])

  return (
    <>
    {isOpen && <ModelConfirmation url="/deshboard" setIsOpen={setIsOpen}/>}
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
            ref={nameRef}
          />
          <StyledInput
            type="text"
            placeholder="Preço"
            name="price"
            onChange={handleOnChange}
            maxLength={12}
            ref={priceRef}
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
            ref={descriptionRef}
          />
          <div style={{display: "flex", gap: "1em"}}>
            <StyledButtonSubmit type="button" onClick={() => setIsOpen(true)} style={{ width: "100%", backgroundColor: "white", color: "#333", cursor: "pointer"}}>
             Cancelar
            </StyledButtonSubmit>
            <StyledButtonSubmit type="submit" style={{ width: "100%" }}>
             {nameBtn}
            </StyledButtonSubmit>
          </div>
        </StyledForm>
      </StyledConteine>
    </>
  );
}

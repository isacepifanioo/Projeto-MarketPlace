import { useState } from "react";
import { StyledSectionConteine } from "./CreateProducts.styled";
import AuthProducts, { Data } from "./form/AuthProducts";
import { InforProducts } from "./form/InforProducts";
import { InstacieAxios } from "../../../helper/Instancer";
import { Error } from "../../layouts/model/Error/Error";
import axios from "axios";

export const CreateProducts = () => {
  const [error, setError]= useState(undefined)
  const [data, setData] = useState<Data>({
    img: [],
    name: "",
    price: '',
    description: "",
  });

  async function postProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const formData = new FormData();

      for (const key in data) {
        const value = data[key as keyof Data];

        if (Array.isArray(value)) {
          value.forEach((blob) => {
            formData.append(`img`, blob);
          });
        } else {
          formData.append(key, value);
        }
        // if (Array.isArray(value)) {
        //   value.forEach((blob) => {
        //     formData.append(`img`, blob);
        //   });
        // } else if (typeof value === "number") {
        //   formData.append(key, value.toString());
        // } else {
        //   formData.append(key, value);
        // }
      }
      await InstacieAxios.post("/products/create", formData, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token")!)}`,
        },
      });
    } catch (e) {
      if(axios.isAxiosError(e)) {
        const resposta = e.response?.data
        setError(resposta)
        console.log(resposta);
      }
    }
  }

  function handleDeleteImg(position: number) {
    const filesItens = data.img.filter((prevent) => {
      if(prevent instanceof File && data.img[position] instanceof File) {
        return data.img[position].name !== prevent.name
      }
    })
   setData(prevent => ({...prevent, ['img']: filesItens}))
  }

  function handleCurretMesagem() {
    setError(undefined)
  }

  return (
    <StyledSectionConteine>
      { error && <Error message={error} handleCurretMesagem={handleCurretMesagem}/> }
      <InforProducts
        img={data.img}
        description={data.description}
        name={data.name}
        price={data.price}
        handleDeleteImg={handleDeleteImg}
      />
      <AuthProducts setData={setData} handlePostSubmit={postProduct} nameBtn=" Cria Produto"/>
    </StyledSectionConteine>
  );
};

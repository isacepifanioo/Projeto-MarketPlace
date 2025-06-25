import { useState } from "react";
import { StyledSectionConteine } from "./CreateProducts.styled";
import AuthProducts, { Data } from "./form/AuthProducts";
import { InforProducts } from "./form/InforProducts";
import { InstacieAxios } from "../../../helper/Instancer";
import axios from "axios";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const CreateProducts = () => {
  const navigate = useNavigate()
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
      }
      await InstacieAxios.post("/products/create", formData, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token")!)}`,
        },
      });

      navigate("/deshboard")
    } catch (e) {
      if(axios.isAxiosError(e)) {
        const resposta = e.response?.data
        toast.error(`${resposta}`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
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
  

  return (
    <StyledSectionConteine>
      <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
      />
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

import { StyledSectionConteine } from "../authProducts/CreateProducts.styled";
import { InforProducts } from "../authProducts/form/InforProducts";
import AuthProducts, { Data } from "../authProducts/form/AuthProducts";
import { Error } from "../../layouts/model/Error/Error";
import axios from "axios";
import { useEffect, useState } from "react";
import { InstacieAxios } from "../../../helper/Instancer";
import { useNavigate, useParams } from "react-router-dom";

export const UpdateProduct = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(undefined);
  const [data, setData] = useState<Data>({
    img: [],
    name: "",
    price: "",
    description: "",
  });
  const { id } = useParams();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const product = await InstacieAxios.get(`/products/${id}`);
        setData(product.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          navigate("/deshboard");
        }
      }
    };

    getProduct();
  }, [id, navigate]);
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
      await InstacieAxios.patch(`/products/update/${id}`, formData, {
        headers: {
          Authorization: `bearer ${JSON.parse(localStorage.getItem("token")!)}`,
        },
      });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const resposta = e.response?.data;
        setError(resposta);
      }
    }
  }

  function handleDeleteImg(position: number) {
    const filesItens = data.img.filter((prevent) => {
      if (prevent instanceof File && data.img[position] instanceof File) {
        return data.img[position].name !== prevent.name;
      }
    });
    setData((prevent) => ({ ...prevent, ["img"]: filesItens }));
  }

  function handleCurretMesagem() {
    setError(undefined);
  }
  return (
    <>
      <StyledSectionConteine>
        {error && (
          <Error message={error} handleCurretMesagem={handleCurretMesagem} />
        )}
        <InforProducts
          img={data.img}
          description={data.description}
          name={data.name}
          price={data.price}
          handleDeleteImg={handleDeleteImg}
        />
        <AuthProducts
          setData={setData}
          handlePostSubmit={postProduct}
          data={data}
          nameBtn="Editar Produto"
        />
      </StyledSectionConteine>
    </>
  );
};

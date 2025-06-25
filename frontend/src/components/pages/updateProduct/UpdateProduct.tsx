import { StyledSectionConteine } from "../authProducts/CreateProducts.styled";
import { InforProducts } from "../authProducts/form/InforProducts";
import AuthProducts, { Data } from "../authProducts/form/AuthProducts";
import axios from "axios";
import { useEffect, useState } from "react";
import { InstacieAxios } from "../../../helper/Instancer";
import { useNavigate, useParams } from "react-router-dom";
import { StyledUpdateProduct } from "../authProducts/UpdateProducts.Style";
import { Bounce, toast, ToastContainer } from "react-toastify";

export const UpdateProduct = () => {
  const navigate = useNavigate();
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
      navigate("/deshboard")
    } catch (e) {
      if (axios.isAxiosError(e)) {
        const resposta = e.response?.data;
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
      if (prevent instanceof File && data.img[position] instanceof File) {
        return data.img[position].name !== prevent.name;
      }
    });
    setData((prevent) => ({ ...prevent, ["img"]: filesItens }));
  }

  return (
    <StyledUpdateProduct>
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
        <AuthProducts
          setData={setData}
          handlePostSubmit={postProduct}
          data={data}
          nameBtn="Editar Produto"
        />
      </StyledSectionConteine>
    </StyledUpdateProduct>
  );
};

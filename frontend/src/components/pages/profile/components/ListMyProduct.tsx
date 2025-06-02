import { IProducts } from "../../../../interface/User";
import {
  StyledConteineList,
  StyledConteineProduct,
  StyledConteineStars,
  StyledInforProduct,
  StyledLButton,
  StyledProductImg,
  StyledStars,
} from "./ListMyProduct.styled";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { Stars } from "../../../layouts/stars/Stars";
import { useEffect, useState } from "react";
import { InstacieAxios } from "../../../../helper/Instancer";
import { Link, useNavigate } from "react-router-dom";

interface Props {
  Search: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  setProduct: React.Dispatch<React.SetStateAction<IProducts>>
  isOpen: boolean
}

export const ListMyProduct = ({ Search, setIsOpen, setProduct, isOpen }: Props) => {
  const [products, setProducts] = useState<IProducts[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getMyProducts() {
      try {
        const products = await InstacieAxios.get("products/myProduct", {
          headers: {
            Authorization: `bearer ${JSON.parse(
              localStorage.getItem("token")!
            )}`,
          },
        });
        setProducts(products.data);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e: unknown) {
        if (!localStorage.getItem("token") && !localStorage.getItem("user")) {
          navigate("/");
        }
      }
    }
    if(isOpen || !isOpen) {
      getMyProducts();
    }
  }, [navigate, isOpen]);
  return (
    <StyledConteineList>
      {products.length > 0 ? (
        products
          .filter((product) =>
            product.name.toLowerCase().includes(Search.toLowerCase())
          )
          .map((product) => (
            <StyledConteineProduct key={product.id}>
              <StyledInforProduct>
                <StyledProductImg $img={`http://localhost:3000/${product.img[0]}`} />
                <div>
                  <h1>{product.name.slice(0, 30)}</h1>
                  <StyledStars>
                    <StyledConteineStars>
                      <Stars
                        qtyStars={
                          product.reviews!.reduce(
                            (ac, review) => ac + review.review.stars,
                            0
                          ) / product.reviews!.length
                        }
                      />
                    </StyledConteineStars>
                    <p>({product.reviews!.length})</p>
                  </StyledStars>
                </div>
              </StyledInforProduct>
              <div className="conteineBtn">
                <StyledLButton>
                  <Link to={`/deshboard/product/${product.id}`}>
                    <FaEye />
                  </Link>
                </StyledLButton>
                <StyledLButton>
                  <Link to={`/deshboard/update/${product.id}`}><FaRegEdit /></Link>
                </StyledLButton>
                <StyledLButton onClick={() => {
                  setIsOpen(prevent => !prevent)
                   setProduct(product)
                }}>
                  <FaDeleteLeft />
                </StyledLButton>
              </div>
            </StyledConteineProduct>
          ))
      ) : (
        <StyledConteineList>
          <h3 className="message">
            Você não possui nenhum produto.{" "}
            <Link to="/deshboard/authProducts">Clique aqui</Link> para começar
            sua jornada de empreendedorismo.
          </h3>
        </StyledConteineList>
      )}
    </StyledConteineList>
  );
};

import { MdOutlineShoppingBag } from "react-icons/md";
import { useAxios } from "../../../../hook/useAxios";
import { IProducts } from "../../../../interface/User";
import {
  StyledItens,
  StyledItensConteineBag,
  StyledItensConteineInforProduct,
  StyledItensImg,
  StyledItensInforProduct,
} from "./Product.styled";
import { StyledSpiner } from "../../../../spiner/Spine.styled";
import { Link } from "react-router-dom";
import { InstacieAxios } from "../../../../helper/Instancer";
import { useContext } from "react";
import { ContextCart } from "../../../../context/useContextCart";

export const Product = () => {
  const {getItensCart} = useContext(ContextCart);
  const { data, loading } = useAxios<IProducts[]>({
    method: "get",
    url: "/products",
  });

  async function handleBtnBag(e: React.MouseEvent<HTMLDivElement, MouseEvent>, id: string) {
    e.stopPropagation()
    e.preventDefault()

    await InstacieAxios.post(`cart/${id}`, {}, {
      headers: {
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
      }
    });

    await getItensCart();
  }

  return (
    <>
      {loading && <StyledSpiner />}
      {data ?
        data.map((product) => (
          <StyledItens key={product.id}>


            <Link to={`${product.id}`}>
              <StyledItensImg $img={`http://localhost:3000/${product.img[0]}`} />
              <StyledItensConteineInforProduct>
                <StyledItensInforProduct>
                  <p>{product.name}</p>
                  <p>
                    <span>R$ </span>
                    {product.price}.00
                  </p>
                </StyledItensInforProduct>
                <StyledItensConteineBag onClick={(e) => handleBtnBag(e, product.id)}>
                  <MdOutlineShoppingBag />
                </StyledItensConteineBag>
              </StyledItensConteineInforProduct>
            </Link>

            
          </StyledItens>
        )) : <StyledItens className="placeholder"/>}
    </>
  );
};

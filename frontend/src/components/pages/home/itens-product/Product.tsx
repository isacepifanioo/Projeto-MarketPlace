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

export const Product = () => {
  const { data, loading } = useAxios<IProducts[]>({
    method: "get",
    url: "/products",
  });

  return (
    <>
      {loading && <StyledSpiner />}
      {data ?
        data.map((product) => (
          <StyledItens key={product.id}>
            <StyledItensImg $img={`http://localhost:3000/${product.img[0]}`} />
            <StyledItensConteineInforProduct>
              <StyledItensInforProduct>
                <p>{product.name}</p>
                <p>
                  <span>R$ </span>
                  {product.price}.00
                </p>
              </StyledItensInforProduct>
              <StyledItensConteineBag>
                <MdOutlineShoppingBag />
              </StyledItensConteineBag>
            </StyledItensConteineInforProduct>
          </StyledItens>
        )) : <StyledItens className="placeholder"/>}
    </>
  );
};

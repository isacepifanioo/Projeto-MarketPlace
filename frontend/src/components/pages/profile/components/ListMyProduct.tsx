// import { useAxios } from "../../../../hook/useAxios"
// import { IProducts } from "../../../../interface/User";
// import { StyledSpiner } from "../../../../spiner/Spine.styled";
import { products } from "./../../../../../database/database";
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

export const ListMyProduct = ({ Search }: { Search: string }) => {
  return (
    <StyledConteineList>
      {/* {loading && <StyledSpiner/>}
        {data ? (
            <p>Product ativo</p>
        ) : (
            <p>
                não existe produto
            </p>
        )} */}
      {products &&
        products
          .filter((product) =>
            product.name.toLowerCase().includes(Search.toLowerCase())
          )
          .map((product) => (
            <StyledConteineProduct key={product.id}>
              <StyledInforProduct>
                <StyledProductImg $img={product.img[0]} />
                <div>
                  <h1>{product.name}</h1>
                  <StyledStars>
                    <StyledConteineStars>
                      <Stars
                        qtyStars={
                          product.reviews.reduce(
                            (ac, review) => ac + review.rating,
                            0
                          ) / product.reviews.length
                        }
                      />
                    </StyledConteineStars>
                    <p>({product.reviews.length})</p>
                  </StyledStars>
                </div>
              </StyledInforProduct>
              <div className="conteineBtn">
                <StyledLButton>
                  <FaEye />
                </StyledLButton>
                <StyledLButton>
                  <FaRegEdit />
                </StyledLButton>
                <StyledLButton>
                  <FaDeleteLeft />
                </StyledLButton>
              </div>
            </StyledConteineProduct>
          ))}
    </StyledConteineList>
  );
};

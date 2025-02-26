import {
  BoxStyled,
  StyledConteineItens,
  StyledConteineSection,
} from "./Home.styled";
import banner from "../../../../public/banner.png";
import { Product } from "./itens-product/Product";
export const Home = () => {
  return (
    <>
      <StyledConteineSection>
        <BoxStyled $img={banner}>
          <div className="img"></div>
        </BoxStyled>
        <h1>Melhores de Hoje</h1>
        <StyledConteineItens>
          <Product />
        </StyledConteineItens>
      </StyledConteineSection>
    </>
  );
};

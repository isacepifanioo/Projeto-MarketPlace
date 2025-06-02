import styled from "styled-components";

interface Props {
    $perfilImg?: string
    $productImg?: string
    $BgColorBtn?: string
    $colorBtn?: string
}

export const StylePageProduct = styled.div`

    width: 1200px;
    margin: 1em auto;

`

export const StyledPageProductInfor = styled.div`

    display: flex;
    align-items: center;
    gap: 1em;
    border-bottom: 1px solid #33333332;
`

export const StyledPageProductRecommendation = styled.div`

    display: flex;
    gap: 1em;
    margin: 1em 0 3em 0;

`

export const StyledItensRecommendation = styled.div`
  height: 300px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  border-radius: 5px;
  padding: 0.2em;
  margin-bottom: 2em;


  & .placeholder {
    width: 100%;
  }
`;

export const StyledPageProductImg = styled.div<Props>`

    background-image: ${({$productImg}) => $productImg && `url("${$productImg}")`};
    background-repeat: no-repeat;
    background-size: 15em;
    background-position: center;
    height: 350px;
    width: 350px;
    image-rendering: auto;
    border-radius: 10px;
    margin-bottom: 1em;
    border: 1px solid #33333332;
`

export const StyledPageConteineProductmgSmall = styled.div`

    display: flex;
    align-items: center;
    gap: 1em;
    justify-content: center;
    margin-bottom: 1em;
`

export const StyledPageProductmgSmall = styled.div<Props>`

    background-image: ${({$productImg}) => $productImg && `url("${$productImg}")`};
    background-repeat: no-repeat;
    background-size: 3em;
    background-position: center;
    height: 50px;
    width: 50px;
    border: 1px solid black;
    border-radius: 5px;
    padding: 2em;
`

export const StyledPageProductConteineInfo = styled.div`

    display: flex;
    flex-direction: column;
    gap: .7em;
    height: 100%;
    width: 35em;

    & h2 {
        font-size: 2.5em;
        font-weight: bold;
    }

    & p {
        width: 500px;
        height: 250px;
        overflow-y: scroll;
        word-wrap: break-word;
        overflow-x: hidden;

        text-align: left;       
        white-space: normal;    
        word-break: break-word;
        line-height: 1.6;   
        font-size: 1rem;
    }

    & h4 {
        font-size: 1.4em;
        font-weight: bold;
    }

`

export const StyledPageProductConteineButton = styled.div`

    width: 50em;
    display: flex;
    justify-content: center;
    border-radius: 5px;
    flex-direction: column;
    gap: .5em;
    height: 20em;
    padding: 1em;
    border: 1px solid black;
    transition: .4s;
    box-shadow: 1px 1px 8px #0202026f;
    
    &:hover {
        box-shadow: 4px 4px 4px black;
    }

    & a {
        text-align: center;
        text-decoration: none;
        font-size: 1em;
        padding: .4em;
        border-radius: 5px;
        border: 1px solid black;
        font-weight: bold;
        background-color: #333;
        color: white;
    }

`
export const StyledPageProductConteineQty = styled.div`

    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;

    & span {
        width: 100%;
        text-align: center;
    }

    & button {
        width: 30%;
        border: none;
        height: 30px;
    }
    & .remove {
        border-radius: 4px 0px 0px 4px;
    }

    & .add {
        border-radius: 0px 2px 2px 0px;
        background-color: #333;
        color: white;
    }

`

export const StyledPageProductConteinePriceQty = styled.div`

    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;

`

export const StyledPageProductButton = styled.button<Props>`

    font-size: 1em;
    padding: .4em;
    border-radius: 5px;
    border: 1px solid black;
    font-weight: bold;
    background-color: ${({$BgColorBtn}) => $BgColorBtn ? $BgColorBtn : "white"};
    color: ${({$colorBtn}) => $colorBtn ? $colorBtn : "white"};

    &:hover {
        background-color: ${({$BgColorBtn}) => $BgColorBtn ? $BgColorBtn : "white"};
        color: ${({$colorBtn}) => $colorBtn ? $colorBtn : "white"};
    }

`


export const StyledPefilImg= styled.div<Props>`

    background-image: ${({$perfilImg}) => $perfilImg && `url("${$perfilImg}")`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
    border: 1px solid black;
    border-radius: 50%;
    width: 30px;
    height: 30px;

`


export const StyledImgProduct= styled.div<Props>`

    background-image: ${({$perfilImg}) => $perfilImg && `url("${$perfilImg}")`};
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    border: 1px solid black;
    border-radius: 5px;
    width: 100px;
    height: 100px;

`
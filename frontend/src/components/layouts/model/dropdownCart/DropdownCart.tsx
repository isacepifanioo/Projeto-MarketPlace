import { Link } from "react-router-dom"
import { ConteineControllerBuy, ConteineDropDown, ConteineItens, ConteineQtyProduct, ConteineTitle, ImgItensCart } from "./DropdownCart.Styled"
import {forwardRef, useContext} from "react"
import { ContextCart } from "../../../../context/useContextCart"
import { InstacieAxios } from "../../../../helper/Instancer"
// import { Product } from "../../../pages/home/itens-product/Product"
export interface MyCard {
    img: string,
    productId: string,
    productName: string,
    quantity: number,
    price: number,
}

interface Props {
    isOpen: boolean
}

export const DropDownCart = forwardRef<HTMLDivElement, Props>(({isOpen}, ref) => {
    const {itens, totPriceItens} = useContext(ContextCart);
    const {getItensCart} = useContext(ContextCart)


    async function handleAddBtnBag(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
        e.stopPropagation()
        e.preventDefault()
    
        await InstacieAxios.post(`cart/${id}`, {}, {
          headers: {
            "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
          }
        });
    
        await getItensCart();
    }

    async function handleSubtrairBtnBag(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, id: string) {
        e.stopPropagation()
        e.preventDefault()
    
        try {
            await InstacieAxios.delete(`cart/${id}`, {
                headers: {
                    "Authorization": `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
                }
            });
            await getItensCart();
            return
        } catch (error) {
            console.warn("Erro ao remover item, mas pode ter sido removido mesmo assim:", error);
        }

    }

    return (
        <ConteineDropDown ref={ref} style={{transform: isOpen ? "translateX(0)" : "translateX(100%)", opacity: isOpen ? "1" : "0"}}>
             <ConteineItens>
                 {itens.map((value) => (
                    <Link to={""} key={value.productId}>
                        <ImgItensCart $img={`http://localhost:3000/${value.img}`}/>
                        <ConteineTitle>
                            <h3>{value.productName}</h3>
                            <h6>R${value.price}</h6>
                            <ConteineQtyProduct>
                                <button onClick={(e) => handleSubtrairBtnBag(e, value.productId)}>-</button>
                                <span>{value.quantity}</span>
                                <button onClick={(e) => handleAddBtnBag(e, value.productId)}>+</button>
                            </ConteineQtyProduct>
                        </ConteineTitle>
                    </Link>
                 ))}
             </ConteineItens>
                 <ConteineControllerBuy>
                    <h2>Sub-Total <span>R$ {totPriceItens ? totPriceItens : "0.00"}</span></h2>
                    <button>Comprar</button>
                </ConteineControllerBuy>
        </ConteineDropDown>
    )

})
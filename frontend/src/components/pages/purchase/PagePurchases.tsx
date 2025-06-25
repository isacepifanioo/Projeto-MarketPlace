import { ConteineComfirm } from "./PagePurchase.styled"
import qrCode from "../../../../public/qrCode.png"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react";
import { ContextCart } from "../../../context/useContextCart";

export const PagePurchases = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const {itens, BuyProduct} = useContext(ContextCart);

    async function handleBuyProduct() {
        setLoading(true)
        try {
            for (const item of itens) {
                for(let i = 1; i <= item.quantity; i++) {
                    await BuyProduct(item.productId)
                }
            }
        } catch (er) {
            console.log(er);
            console.warn("Não foi possivel fazer a compra. " + er);
        }
        setLoading(false)
        navigate("/")
    }
    
  return (
    <ConteineComfirm $img={qrCode}>
        <h2>Clique em continuar para efetuar sua compra</h2>
        <div className="img"></div>
        {loading ? <button>Aguarde...</button> : <button onClick={handleBuyProduct}>Continuar</button>}
    </ConteineComfirm>
  )
}

import { ConteineComfirm } from "./PagePurchase.styled"
import qrCode from "../../../../public/qrCode.png"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

export const PagePurchase = () => {
    const navigate = useNavigate();
    const params = useParams().id

    async function BuyProduct() {
        try {
            await axios.post(`http://localhost:3000/purchase/create/${params}`, {}, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
                }
            }) 
            navigate("/")
        } catch (er) {
            console.warn("Não foi possivel fazer a compra. " + er);
        }
    }
    
  return (
    <ConteineComfirm $img={qrCode}>
        <h2>Clique em continuar para efetuar sua compra</h2>
        <div className="img"></div>
        <button onClick={BuyProduct}>Continuar</button>
    </ConteineComfirm>
  )
}

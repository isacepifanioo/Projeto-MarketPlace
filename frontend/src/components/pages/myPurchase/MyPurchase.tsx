import { useEffect, useState } from "react"
import { InstacieAxios } from "../../../helper/Instancer"
import { Link } from "react-router-dom"
import { ConteineBtn, ConteineInfor } from "./MyPurchase.styled"
import { IProducts } from "../../../interface/User"

interface Purchase {
    productId: string,
    productName: string,
    quantity: number,
    price: number,
    date: string
}

export const MyPurchase = () => {
    const[historyPurchase, setHistoryPurchase] = useState<Purchase[]>([])
    const [products, setProducts] = useState<IProducts[]>([])
    useEffect(() => {
        async function getHistoryPurchase() {
            try {
                const purchaseData = await InstacieAxios.get("purchase", {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
                    }
                })
                setHistoryPurchase(purchaseData.data);
            } catch (error) {
                console.warn("Não existe nenhum produto comprado. " + error);
            }
        }
        getHistoryPurchase()
    }, [])

    useEffect(() => {
        async function getProduct() {
            try {
                const data = await InstacieAxios.get("products", {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
                    }
                })
                setProducts(data.data);
            } catch (error) {
                console.warn("Não existe produtos. " + error);
            }
        }

        getProduct()
    }, [])
  return (
    <div>
        <h1>Minhas compras</h1>
        {historyPurchase && (
            historyPurchase.map((productvaluePurchase, index) => (
                <div key={index}>
                    <ConteineInfor>
                        <div style={{display: "flex", flexDirection: "column", gap: ".3em"}}>
                            <h2>Nome: {productvaluePurchase.productName}</h2>
                            <h3>Preço: {productvaluePurchase.price}</h3>
                            <p>Quantidade: {productvaluePurchase.quantity}</p>
                        </div>
                        <div>
                            <p style={{fontSize: ".8em"}}>date {productvaluePurchase.date}</p>
                        </div>
                    </ConteineInfor>
                    <ConteineBtn>
                        <Link to={`/${productvaluePurchase.productId}`}>Visualizar</Link>
                        {
                            (() => {
                                const findProduct = products.find(product => product.id === productvaluePurchase.productId)

                                const userAlready = findProduct?.reviews?.some(review => review.userId === JSON.parse(localStorage.getItem("user")!))

                                if(findProduct && !userAlready) {
                                    return (
                                        <Link to={`${productvaluePurchase.productId}`}>Avaliar</Link> 
                                    )
                                }

                                return null
                            })()
                        }

                    </ConteineBtn>
                </div>
            ))
        )}
    </div>
  )
}

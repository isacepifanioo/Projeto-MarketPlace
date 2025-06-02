import { createContext, useEffect, useState } from 'react'
import { InstacieAxios } from '../helper/Instancer';
import { MyCard } from '../components/layouts/model/dropdownCart/DropdownCart';

interface ICartContext {
    qtyItens: number,
    getItensCart: () => Promise<void>,
    itens: MyCard[],
    totPriceItens: number
}

// eslint-disable-next-line react-refresh/only-export-components
export const ContextCart = createContext<ICartContext>({
    qtyItens: 0,
    getItensCart: async () => {},
    itens: [],
    totPriceItens: 0
});


export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [qtyItens, setQtyItens] = useState(0);
    const [itens, setItens] = useState([])
    const [totPriceItens, setTotPriceItens] = useState(0)

    async function getItensCart() {
        try {
            const itensCart = await InstacieAxios.get("cart/", {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
            }
            })
            setQtyItens(itensCart.data.length ?? 0)
            setItens(itensCart.data ?? [])
            const data: MyCard[] = itensCart.data;
            // PRECISA FAZER A SOMA DO QTY 
            setTotPriceItens(() => {
                return data.reduce((ac, itens) => ac + Number.parseFloat(itens.price.toString()) * itens.quantity , 0)
            })
        } catch (err) {
            console.error("❌ Erro ao buscar carrinho:", err);
        }
    }
    
    useEffect(() => {
        getItensCart()
    }, [])
    return <ContextCart.Provider value={{qtyItens, getItensCart, itens, totPriceItens}}>{children}</ContextCart.Provider>
}

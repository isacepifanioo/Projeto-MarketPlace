import { createContext,  useState } from "react";
import { IProducts } from "../interface/User";

interface IContext {
    product: IProducts
    setProduct: React.Dispatch<React.SetStateAction<IProducts>>
}

// eslint-disable-next-line react-refresh/only-export-components
export const ContextPurchase = createContext<IContext>({
    product: {
        id: "",
        img: [],
        description: "",
        name: "",
        price: "",
        qtyPurchase:0,
        qtyStars: 0,
        reviews: [],
        userId: ""
    },
    setProduct: () => {}
});

export const ContextPurchaseProvider = ({children}: {children: React.ReactNode}) => {
    const [product, setProduct] = useState<IProducts>({
        id: "",
        img: [],
        description: "",
        name: "",
        price: "",
        qtyPurchase:0,
        qtyStars: 0,
        reviews: [],
        userId: ""
    })
    
    console.log("product: ", product);
    return <ContextPurchase.Provider value={{product, setProduct}}>
        {children}
    </ContextPurchase.Provider>
}

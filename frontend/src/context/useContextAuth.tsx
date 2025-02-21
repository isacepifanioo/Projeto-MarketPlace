import { createContext } from "react";
import { Auth } from "../hook/useAuth";
import { IFnAuth } from "../interface/FnContext";

// eslint-disable-next-line react-refresh/only-export-components
export const ContextAuth = createContext<IFnAuth | undefined>(undefined)

export const ContextProvider = ({children}: {children: React.JSX.Element[]}) => {
    const { login, isAuth, register, logout } = Auth() 

    return <ContextAuth.Provider value={{login, isAuth, register, logout}}>{children}</ContextAuth.Provider>

}
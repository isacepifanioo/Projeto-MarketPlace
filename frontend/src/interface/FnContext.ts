import { ErrorMessage } from "./ErrorAuth";
import { UserLogin, UserRegister } from "./User";

export interface httpRespose<T> {
    dados?: T | undefined
    loading: boolean
}

export interface IFnAuth {
    isAuth: boolean
    logout: () => void
    login: (user: UserLogin) => Promise<httpRespose<ErrorMessage>>;
    register: (register: UserRegister) => Promise<httpRespose<ErrorMessage>>;
}
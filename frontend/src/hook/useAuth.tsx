import { useEffect, useState } from "react";
import { InstacieAxios } from "../helper/Instancer";
import axios from "axios";
import { UserLogin, UserRegister } from "../interface/User";
import { ErrorMessage } from "../interface/ErrorAuth";
import { httpRespose, IFnAuth } from "../interface/FnContext";
import { isAdult } from "../helper/isAdult";

export function Auth(): IFnAuth {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if(localStorage.getItem('token')) {
      setIsAuth(true)
    }
  }, [isAuth])

  async function login(user: UserLogin): Promise<httpRespose<ErrorMessage>> {
    try {
      const data = await InstacieAxios.post("/users/login", user);
      auth(data.data.token, data.data.body.id);
      return { loading: false };
    } catch (er) {
      let errors: ErrorMessage = {};
      if (axios.isAxiosError(er)) {
        for (const value in user) {
          const MessageError = er.response?.data.body as string;
          if (!user[value as keyof UserLogin]) {
            errors = MessageError.includes(value)
              ? { [value]: MessageError }
              : {};
            break;
          } else {
            if (MessageError.includes("não esta cadastrado no sistema")) {
              errors = MessageError.includes("não esta cadastrado no sistema")
                ? { ["email"]: MessageError }
                : { [value]: "" };
            }
            if (MessageError.includes("senha")) {
              errors = MessageError.includes("senha")
                ? { ["password"]: MessageError }
                : { [value]: "" };
            }
          }
        }
        return { dados: errors, loading: false };
      } else {
        return { loading: false };
      }
    }
  }

  async function register(register: UserRegister) {
    const data = new FormData();

    for (const registerData in register) {
      data.append(
        registerData,
        register[registerData as keyof UserRegister] as string
      );
    }

    try {
      const DataHttp = await InstacieAxios.post("/users/create", data);
      auth(DataHttp.data.token, DataHttp.data.body.id);
      return { loading: false };
    } catch (er) {
      let errors: ErrorMessage = {};
      if (axios.isAxiosError(er)) {
        const MessageError = er.response?.data.body as string;
        for (const value in register) {
          if (!register?.[value as keyof UserRegister]) {
            errors = MessageError.includes(value)
              ? { [value]: MessageError }
              : { [value]: "" };
            break;
          } else {
            if (er.response?.status === 409) {
              errors = { ["email"]: MessageError };
            }
            if (!isAdult(register.birth_date) && value === "birth_date") {
              errors = { ["birth_date"]: MessageError };
            }

            if (
              register.password !== register.confirmPassword &&
              value === "password"
            ) {
              errors = { ["password"]: MessageError };
            }
          }
        }
        return { dados: errors, loading: false };
      } else {
        return { loading: false };
      }
    }
  }

  function auth(token: string, id: string) {
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(id));
    setIsAuth(true);
  }

  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsAuth(false);
  }

  return { login, isAuth, register, logout };
}

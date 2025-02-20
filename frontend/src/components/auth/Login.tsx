import { Inputs } from "../inputsAuth/Inputs";
import React, { useContext, useState } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { LiaEyeSlashSolid } from "react-icons/lia";
import { LiaEyeSolid } from "react-icons/lia";
import { StyledForm, StyledInputsBox, StyledButtonSubmit } from "./Auth.styled";
import { UserLogin } from "../../interface/User";
import { StyledSpiner } from "../../spiner/Spine.styled";
import { ErrorMessage } from "../../interface/ErrorAuth";
import { ContextAuth } from "../../context/useContextAuth";
import {  httpRespose, IFnAuth } from "../../interface/FnContext";
interface Props {
  active: boolean;
}

export const Login = ({ active }: Props) => {
  const [see, setSee] = useState(false);
  const [user, setUser] = useState<UserLogin>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ErrorMessage>({});
  const { login } = useContext(ContextAuth) as IFnAuth;

  function handleLogin(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUser((prevent) => ({ ...prevent, [name]: value.trim() }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true)
    setError({});
    const { dados, loading } = await login(user) as httpRespose<ErrorMessage>

    if (dados) {
      setError(dados);
      setLoading(loading);
    } else {
      setLoading(loading);
    }

  }

  return (
    <StyledForm $active={active} onSubmit={handleSubmit}>
      <h1>Login</h1>
      <StyledInputsBox>
        <Inputs
          name="email"
          placeholder="E-mail"
          type="email"
          handleOnChange={handleLogin}
        />
        <HiOutlineMail />
        <p>{error.email}</p>
      </StyledInputsBox>
      <StyledInputsBox>
        <Inputs
          name="password"
          placeholder="Senha"
          type={see ? "text" : "password"}
          handleOnChange={handleLogin}
        />
        {see ? (
          <LiaEyeSolid onClick={() => setSee((prevent) => !prevent)} />
        ) : (
          <LiaEyeSlashSolid onClick={() => setSee((prevent) => !prevent)} />
        )}
        <p>{error.password}</p>
      </StyledInputsBox>
      <StyledButtonSubmit type="submit" $loading={loading} $Auth={0}>
        {loading ? <StyledSpiner /> : "Entrar"}
      </StyledButtonSubmit>
    </StyledForm>
  );
};

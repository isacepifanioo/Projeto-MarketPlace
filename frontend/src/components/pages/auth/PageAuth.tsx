import { useState } from "react";
import { Login } from "../../auth/Login";
import { Register } from "../../auth/Register";
import { ConteineAuth, ConteineBody, ConteineBtn } from "./PageAuth.styled";

export const PageAuth = () => {
  const [ login, setLogin ] = useState(true)
  return (
    <ConteineBody>
      <ConteineAuth>
        <Login active={login}/>
        <Register active={!login}/>
      </ConteineAuth>
      <ConteineBtn>
        <p className={login ? 'active' : ''} onClick={() => setLogin(true)}>Login</p>
        <p className={!login ? 'active' : ''} onClick={() => setLogin(false)}>Register</p>
      </ConteineBtn>
    </ConteineBody>
  );
};

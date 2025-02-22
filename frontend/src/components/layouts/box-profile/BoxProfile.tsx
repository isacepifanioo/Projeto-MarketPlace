import { Link } from "react-router-dom";
import {
  StyledBoxProfile,
  StyledInnerBoxProfile,
  StyleTriangleBoxProfile,
} from "./BoxProfile.styled";

import { ContextAuth } from './../../../context/useContextAuth'
import { useContext } from "react";
import { IFnAuth } from "../../../interface/FnContext";



export const BoxProfile = () => {
  const {logout} = useContext(ContextAuth) as IFnAuth 
  return (
    <>
      <StyleTriangleBoxProfile>
        <div className="borders"></div>
      </StyleTriangleBoxProfile>
      <StyledInnerBoxProfile>
        <Link to='/auth' onClick={logout}>Perfil</Link>
        <Link to='/' onClick={logout}>Configuração</Link>
        <Link to='/auth' onClick={logout}>Sair</Link>
      </StyledInnerBoxProfile>
      <StyledBoxProfile />
    </>
  );
};

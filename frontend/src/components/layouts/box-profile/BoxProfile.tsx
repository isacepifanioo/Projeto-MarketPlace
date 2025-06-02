import { Link } from "react-router-dom";
import {
  StyledBoxProfile,
  StyledInnerBoxProfile,
  StyleTriangleBoxProfile,
} from "./BoxProfile.styled";

import { ContextAuth } from './../../../context/useContextAuth'
import { useContext } from "react";
import { IFnAuth } from "../../../interface/FnContext";

interface Props {
    setIsOpenAddress: React.Dispatch<React.SetStateAction<boolean>>
}

export const BoxProfile = ({setIsOpenAddress}: Props) => {
  const {logout} = useContext(ContextAuth) as IFnAuth 
  return (
    <>
      <StyleTriangleBoxProfile>
        <div className="borders"></div>
      </StyleTriangleBoxProfile>
      <StyledInnerBoxProfile>
        <Link to='/deshboard'>Perfil</Link>
        <Link to="" onClick={() => setIsOpenAddress(true)}>Endereço</Link>
        <Link to='/auth' onClick={logout}>Sair</Link> 
      </StyledInnerBoxProfile>
      <StyledBoxProfile />
    </>
  );
};

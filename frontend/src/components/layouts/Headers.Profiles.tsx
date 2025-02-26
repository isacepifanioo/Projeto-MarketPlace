import { StyledHeaderProfile } from "./Headers.Profiles.styled"
import { IoArrowBackOutline } from "react-icons/io5";
import { IoStorefront } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";


export const HeadersProfiles = () => {
    const navigate = useNavigate()
  return (
    <StyledHeaderProfile>
        <IoArrowBackOutline onClick={() => navigate('/')}/>
        <IoStorefront />
        <div>
            <Link to='/deshboard'>Perfil</Link>
            <Link to='/createProducts'>Cria Produtos</Link>
        </div>
    </StyledHeaderProfile>
  )
}

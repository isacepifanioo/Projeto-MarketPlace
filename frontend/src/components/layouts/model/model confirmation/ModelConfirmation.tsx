import { useNavigate } from "react-router-dom";
import { StyledConteineBtn, StyledModelConfirmation } from "./ModelConfirmation.Styled"
import React, {useState, useEffect} from "react" 


export const ModelConfirmation = ({ url, setIsOpen }: {url: string, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) => {
    const [confirmation, setConfirmation] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {

        if(confirmation) {
            navigate('/deshboard')
        } 

    }, [confirmation, url, setIsOpen, navigate])
  return (
    <StyledModelConfirmation>
        <h3>Tem certeza que deseja Cancelar</h3>
        <p>Você pode perder todas as informações que você adicionou</p>
        <StyledConteineBtn>
            <button className="btnN" onClick={() => setIsOpen(false)}>Não</button>
            <button className="btnS" onClick={() => setConfirmation(true)}>Sim</button>
        </StyledConteineBtn>
    </StyledModelConfirmation>
  )
}
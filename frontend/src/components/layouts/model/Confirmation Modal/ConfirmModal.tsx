import { useState } from "react"
import { ConteineConfirmModal, ConteinedarkBack, InnerConfirmModal, StyledBtn, StyledConteineBtn, StyledConteineSeeMore, StyledDescription, Styledh2, StyledInforProducts, StyledSeeMore } from "./ConfirmModal.styled"
import { InstacieAxios } from "../../../../helper/Instancer"
import { useNavigate } from "react-router-dom"
import axios from "axios"


interface Props {
  id: string
  name: string,
  price: string,
  description: string
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ConfirmModal = ({id, name, price, description, setIsOpen}: Props) => {
  const [seeMore, setSeeMore] = useState(true)
  const navigate = useNavigate()

    async function handleDeleteProduct() {
      try {
        await InstacieAxios.delete(`/products/delete/${id}`, {
          headers: {
            Authorization: `bearer ${JSON.parse(localStorage.getItem('token')!)}`
          }
        })
        setIsOpen(prevent => !prevent)
      } catch (e) {
        if(axios.isAxiosError(e)) {
          navigate('/deshboard')
        }
      }
    }

   
  return (
    <>
      <ConteinedarkBack/>
      <ConteineConfirmModal>
      <InnerConfirmModal>
        <Styledh2>Você tem certeza que dejesa apagar esse produto?</Styledh2>
        <StyledInforProducts>
          <p className="name"><strong>Nome: </strong>{name}</p>
          <p className="price"><strong>Preço: </strong>{price}</p>
          <StyledDescription $seeMore={seeMore}><strong>Descrição: </strong>{seeMore ? description.slice(0, 126) : description}</StyledDescription>
          <StyledConteineSeeMore>
            <StyledSeeMore onClick={() => setSeeMore(prevent => !prevent)}>{seeMore ? 'Ver Mais' : 'Ver Menos'} </StyledSeeMore><span></span>
          </StyledConteineSeeMore>
        </StyledInforProducts>
        <StyledConteineBtn>
          <StyledBtn onClick={() => setIsOpen(prevent => !prevent)}>Cancelar</StyledBtn>
          <StyledBtn $backgroundColor="#007BFF" $color="#007BFF" $borderColor="#007BFF" onClick={handleDeleteProduct}>Confirmar</StyledBtn>
        </StyledConteineBtn>
      </InnerConfirmModal>
    </ConteineConfirmModal>
    </>
  )
}

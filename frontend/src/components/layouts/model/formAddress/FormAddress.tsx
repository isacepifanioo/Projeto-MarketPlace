import React, { useEffect, useState } from 'react'
import { BottomBlack, ConteineBox, ConteineBoxIcone, ConteineBoxIforAddress, ConteineBoxInputs, ConteineForm, ConteineInput, ConteineWhite } from './FormAddress.styled'
import axios from 'axios'
import { FormUpdateAddress } from './FormUpdateAddress'

export interface IAddress {
    userId: string,
    street: string, // rua .
    number: string, // numero da casa .
    complement: string, 
    neighborhood: string, // bairro .
    city: string, // cidade .
    portalCode: string // cep .
}

interface Props {
    setIsOpenAddress: React.Dispatch<React.SetStateAction<boolean>>
}

export const FormAddress = ({setIsOpenAddress}: Props) => {
    const [address, setAddress] = useState({
        userId: JSON.parse(localStorage.getItem("user")!),
        city: "",
        complement: "",
        neighborhood: "",
        number: "",
        portalCode: "",
        street: ""
    })
    const [existAddress, setExistAddress] = useState(false)
    const [showUpdateAddress, SetShowUpdateAddress] = useState(false)
    useEffect(() => {
        async function getAddress() {
            const address = await axios.get(`http://localhost:3000/address`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
                }
            })
            if(address.data) {
                setAddress(address.data)
                setExistAddress(true)
            }
        }

        getAddress()
    }, [])

    async function deleteAddress() {
        try {
            await axios.delete(`http://localhost:3000/address/delete`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
                }
            })
            setAddress({
                userId: JSON.parse(localStorage.getItem("user")!),
                city: "",
                complement: "",
                neighborhood: "",
                number: "",
                portalCode: "",
                street: ""
            })
            setExistAddress(false)
        } catch (er) {
            console.warn("Falha ao tenta excluir o address. " + er);
        }
    }

    async function handleOnSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            await axios.post(`http://localhost:3000/address/create`, address, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
            }
        })
        setIsOpenAddress(false)
        } catch (er) {
            console.warn("Deu error ao tenta add endereços, tnete novamente. " + er);
            console.log(er);
        }
    }

    async function handlePortalCode(value: string, name: string) {
        if(name == "portalCode" && value.length == 8) {
            try {
                const valuePortalCode = await axios.get(` https://cep.awesomeapi.com.br/json/${value}`)
                const portalCodeInfor = valuePortalCode.data ?? null
                if(portalCodeInfor !== null) {
                    address.city = portalCodeInfor.city
                    address.neighborhood = portalCodeInfor.district
                    address.street = portalCodeInfor.address
                    address.portalCode = portalCodeInfor.cep
                }
            } catch (er) {
                console.warn("Não foi possivel encontra as informações do cep.\n" + er)
            }
        }

        setAddress(prevent => ({...prevent, [name]: value}))
    }
    console.log(showUpdateAddress);
  return (
    <>
        <BottomBlack></BottomBlack>
        <ConteineWhite>
            <div onClick={() =>{
                 setIsOpenAddress(false) 
                 SetShowUpdateAddress(false)
            }} style={{cursor: "pointer"}}>X</div>
            {!existAddress ? (
                <ConteineForm method="post" onSubmit={(e) => handleOnSubmit(e)}>
                
                    <ConteineBoxInputs>
                        <label htmlFor="portalCode">Cep:</label>
                        <ConteineInput type="text" name="portalCode" id="portalCode" placeholder='Digite seu Cep' onChange={(e) => handlePortalCode(e.target.value, e.target.name)} value={address.portalCode || ""}/>
                    </ConteineBoxInputs>
                    
                    <ConteineBox>
                        <ConteineBoxInputs className='street'>
                            <label htmlFor="street">Rua</label>
                            <ConteineInput type="text" name="street" id="street" placeholder='Nome da rua' onChange={(e) => handlePortalCode(e.target.value, e.target.name)} value={address.street || ""}/>
                        </ConteineBoxInputs>
                        <ConteineBoxInputs className='number'>
                            <label htmlFor="number">Numero</label>
                            <ConteineInput type="text" name="number" id="number" placeholder='Numero Casa' onChange={(e) => handlePortalCode(e.target.value, e.target.name)} value={address.number || ""}/>
                        </ConteineBoxInputs>
                    </ConteineBox>

                    <ConteineBoxInputs>
                        <label htmlFor="neighborhood">Bairro</label>
                        <ConteineInput type="text" name="neighborhood" id="neighborhood" placeholder='Bairro' onChange={(e) => handlePortalCode(e.target.value, e.target.name)} value={address.neighborhood || ""}/>
                    </ConteineBoxInputs>

                    <ConteineBoxInputs>
                        <label htmlFor="city">Cidade</label>
                        <ConteineInput type="text" name="city" id="city" placeholder='Nome da cidade' onChange={(e) => handlePortalCode(e.target.value, e.target.name)} value={address.city || ""}/>
                    </ConteineBoxInputs>

                    <ConteineBoxInputs>
                        <label htmlFor="complement">Complemento</label>
                        <ConteineInput type="text" name="complement" id="complement" placeholder='Complemento' onChange={(e) => handlePortalCode(e.target.value, e.target.name)} value={address.complement || ""}/>
                    </ConteineBoxInputs>
                    <div className='conteineBoxSubmit'>
                        <ConteineInput type='submit' value="Salvar" className='inputSubmit'/>
                    </div>

                </ConteineForm>
            ) : (
                <>
                    {!showUpdateAddress ? (
                        <>
                            <ConteineBoxIforAddress>
                                <p>{address.portalCode}</p>
                                <p>{address.street} / {address.number}</p>
                                <p>{address.complement}</p>
                                <p>{address.neighborhood} / {address.city}</p> ...............
                            </ConteineBoxIforAddress>
                            <ConteineBoxIcone>
                                <p onClick={() => SetShowUpdateAddress(true)}>Editar</p>
                                <p onClick={deleteAddress}>Deletar</p>
                            </ConteineBoxIcone>
                        </>
                    ) : (
                        <>
                            <FormUpdateAddress setShowUpdateAddress={SetShowUpdateAddress}/>
                        </>
                    )}
                    
                </>
            )}
        </ConteineWhite>
    </>
  )
}

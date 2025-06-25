import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { InstacieAxios } from "../../../../helper/Instancer";
import { StyledImg } from "../../authProducts/form/InforProducts.styled";
import { ConteineInputs } from "../FormPurchase.styled";
import { StyledButtonSubmit } from "../../../auth/Auth.styled";
import { IProducts } from "../../../../interface/User";

export interface IPerfilWithReviews {
    userId: string,
    perfilImg: string,
    name: string, 
    lastname: string
    date: string,
    review: IReviews
}

export interface IReviews {  
    stars: number,
    comment?: string,
    reviewFile?: (File | string)[]
}

export const EditFormPurchase = () => {
    const navigate = useNavigate()
    const id = useParams().id
    const [position, setPosition] = useState(0);
    const [file, setFile] = useState<string | undefined>(undefined);
    const [qtyStar, setQtyStar] = useState(5)
    const [data, setData] = useState<IReviews>({
        stars: qtyStar,
        comment: "",
        reviewFile: []
    });
    
    useEffect(() => {
        async function getProduct() {
            const resposta = await InstacieAxios.get(`products/${id}`, {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`
                }
            })
            const data = resposta.data as IProducts
            const PerfilReview = data.reviews!.find(reviews => reviews.userId === JSON.parse(localStorage.getItem("user")!))!
            const reviewDb = PerfilReview?.review
            const review = {
                stars: reviewDb.stars,
                comment: reviewDb.comment ?? "",
                reviewFile: reviewDb.reviewFile ?? []
            }
            setQtyStar(review.stars)
            setData(review);
        }
        getProduct()
    }, [id])

    function handleOnChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
        const { files, name } = e.target as HTMLInputElement;
        if (!files || files.length === 0) return;
    
        if (files && files.length > 0) {
          setData((prevent) => ({
            ...prevent,
            [name]: [...prevent.reviewFile ?? [], files[0]],
          }));
        }
    }
    
    function handleOnChageValue(value: string, nome: string) {
        setData(prevent => ({...prevent, [nome]: value }))
    }

    function handleQtyStar(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        const target = e.target as HTMLDivElement
        const dataset = target.dataset.id!
        const id = Number.parseInt(dataset)
        setQtyStar(id)
        setData(prevent => ({...prevent, ["stars"]: id}))
    }

    useEffect(() => {
        const arrayImg = data.reviewFile ?? []
        if(arrayImg.length > 0 && arrayImg[position] instanceof Blob) {
            const fileUrl = URL.createObjectURL(arrayImg[position])
            setFile(fileUrl)
        } else if(arrayImg.length > 0 && typeof arrayImg[position] === 'string') {
            const urlImg = `http://localhost:3000/${arrayImg[position]}`
            setFile(urlImg)
        }
        else {
          setFile(undefined)
        }
    }, [position, data.reviewFile])

    async function patchComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
          const formData = new FormData();
    
          for (const key in data) {
            const value = data[key as keyof IReviews];
    
            if (Array.isArray(value)) {
              value.forEach((blob) => {
                if(typeof blob === "string") {
                  formData.append(`reviewFile`, blob);
                }
                if(blob instanceof File) {
                  formData.append(`reviewFile`, blob);
                }
              });
            } else if(value) {
              formData.append(key, value.toString());
            }
          }
          await InstacieAxios.patch(`/review/${id}`, formData, {
            headers: {
              Authorization: `bearer ${JSON.parse(localStorage.getItem("token")!)}`,
            },
          });
        } catch (e) {
          if(axios.isAxiosError(e)) {
            console.warn("Não foi possivel fazer um comentario. " + e);
          }
        }

        navigate(`/${id}`)
      }

    function handleArrowBack() {
        if(position < 1) return
        setPosition(prevent => prevent - 1)
    }
    function handleArrowForward() {
        const arrayImg = data.reviewFile ?? []
        if(position >= arrayImg.length - 1) return
        setPosition(prevent => prevent + 1)
    }

    function handleDeleteImg(positionParam: number) {
      const reviewsFiles = data.reviewFile!

      setData((prevent) => ({ ...prevent, ["reviewFile"]: reviewsFiles.filter((_, index) => index !== positionParam) }));

    }

    return (
        <form onSubmit={patchComment} style={{textAlign: "center", display: "flex", flexDirection: "column", gap: "1em"}}>
            <div style={{display: "flex", justifyContent: "center", gap: ".4em", fontSize: "2em", alignItems: "center"}}>
                <div>
                    <IoIosArrowBack onClick={handleArrowBack}/>
                </div>
                <div style={{position: "relative"}}>
                  {data.reviewFile && data.reviewFile.length > 0 && (
                  <MdDelete
                    className={`${data.reviewFile && data.reviewFile.length > 0 ? "" : "hidden"} mdDelete`} 
                    style={{position: "absolute", left: "0", fontSize: ".8em", color: "black", backgroundColor: "gray"}} 
                    onClick={() => {
                      handleDeleteImg(position)
                      handleArrowBack()
                    }}
                  />
                  )}
                  <StyledImg $img={file ? file : undefined}/>
                </div>
                <div>
                    <IoIosArrowForward onClick={handleArrowForward}/>
                </div>
            </div>
            <ConteineInputs>
                <input type="file" name="reviewFile" onChange={handleOnChangeFile}/>
                <div className="addImg">Escolhas suas imagens</div>
            </ConteineInputs>
            <div style={{display: "flex", justifyContent: "center", gap: ".4em", fontSize: "3em", cursor: "pointer"}}>
                <div onClick={(e) => handleQtyStar(e)} data-id="1" style={{color: qtyStar >= 1 ? "#FFD700" : "#333"}}>★</div>
                <div onClick={(e) => handleQtyStar(e)} data-id="2" style={{color: qtyStar >= 2 ? "#FFD700" : "#333"}}>★</div>
                <div onClick={(e) => handleQtyStar(e)} data-id="3" style={{color: qtyStar >= 3 ? "#FFD700" : "#333"}}>★</div>
                <div onClick={(e) => handleQtyStar(e)} data-id="4" style={{color: qtyStar >= 4 ? "#FFD700" : "#333"}}>★</div>
                <div onClick={(e) => handleQtyStar(e)} data-id="5" style={{color: qtyStar >= 5 ? "#FFD700" : "#333"}}>★</div>
            </div>
            <div>
                <textarea name="comment" value={data.comment} id="comment" onChange={(e) => handleOnChageValue(e.target.value, e.target.name)} style={{width: "60%", height: "200px", fontSize: "1.2em", padding: ".6em"}} placeholder="Digite seu comentario"></textarea>
            </div>
            <StyledButtonSubmit type="submit" style={{ width: "70%", margin: "0 auto" }}>
                Comentar
            </StyledButtonSubmit>
        </form>
    )
}
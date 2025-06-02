import { Link, useNavigate, useParams } from "react-router-dom"
import { StyledImgProduct, StyledItensRecommendation, StyledPageConteineProductmgSmall, StyledPageProductButton, StyledPageProductConteineButton, StyledPageProductConteineInfo, StyledPageProductConteinePriceQty, StyledPageProductConteineQty, StyledPageProductImg, StyledPageProductInfor, StyledPageProductmgSmall, StyledPageProductRecommendation, StyledPefilImg, StylePageProduct } from "./PageProduct.Styled"
import { useAxios } from "../../../hook/useAxios";
import { IProducts } from "../../../interface/User";
import { StyledItensConteineBag, StyledItensConteineInforProduct, StyledItensImg, StyledItensInforProduct } from "../home/itens-product/Product.styled";
import { MdOutlineShoppingBag } from "react-icons/md";
import { StyledSpiner } from "../../../spiner/Spine.styled";
import { useEffect, useState } from "react";
import { Stars } from "../../layouts/stars/Stars";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';
import "./pageProduct.css"

import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { ETypeInterface } from "../../../main";
import { BsThreeDotsVertical } from "react-icons/bs";
import { InstacieAxios } from "../../../helper/Instancer";


export const PageProduct = ({TypeInterface}: {TypeInterface: ETypeInterface}) => {
    const id = useParams();
    const [qtyProduct, setQtyProduct] = useState<number>(1);
    const navigate = useNavigate();
    const [positionImg, setPositionImg] = useState(0);
    const [currentImg, setCurrentImg] = useState(0);
    const [openThree, setOpenThree] = useState(false)

    const { data: dataProductById, error: errorProductById, loading: loadingProductById, refetch } = useAxios<IProducts>({
        method: "get",
        url: `http://localhost:3000/products/${id.id}`
    })
    const { data: dataProducts, error: errorProducts, loading: loadingProducts } = useAxios<IProducts[]>({
        method: "get",
        url: "http://localhost:3000/products"
    })

    async function handleDeleteComment(id: string) {
        try {
            await InstacieAxios.delete(`review/${id}`, {
                headers: {Authorization: `Bearer ${JSON.parse(localStorage.getItem("token")!)}`}
            })
            setOpenThree(false)
            refetch()
        } catch (error) {
            console.warn("Você não tem permissão para deleta esse comentário. ", error);
        }
    }

    function handleSomePositionImh() {
        const totImgProduct = dataProductById?.img.length ?? 0;

        setCurrentImg(prevent => {
            if(prevent > totImgProduct - 2) return prevent

            return prevent + 1
            
        });
        if(totImgProduct - positionImg < 5) return

        setPositionImg(prevent => prevent + 1)
    }

    function handleSubtrairPositionImg() {
        setCurrentImg(prevent => {
            if(prevent < 1) return prevent

            return prevent - 1
            
        });
        if(positionImg < 1) return
        setPositionImg(prevent => prevent - 1)
    }

    useEffect(() => {
        if(typeof errorProductById === 'string' || typeof errorProducts === 'string') {
            navigate("/")
        }
    }, [errorProductById, errorProducts, navigate])
    return(
        <StylePageProduct>
            <StyledPageProductInfor>
                {/* conteine da imagem */}
                <div> 
                    {loadingProductById ? <StyledSpiner/> : (
                        <>
                            <StyledPageProductImg $productImg={`http://localhost:3000/${dataProductById?.img[currentImg]}`}/>
                            <StyledPageConteineProductmgSmall>
                            <IoIosArrowBack onClick={handleSubtrairPositionImg}/>
                                {dataProductById?.img.slice(positionImg, 4 + positionImg).map((img, index) => (
                                        <StyledPageProductmgSmall key={index} $productImg={`http://localhost:3000/${img}`}></StyledPageProductmgSmall>
                                ))}
                            <IoIosArrowForward onClick={handleSomePositionImh}/>
                            </StyledPageConteineProductmgSmall>
                        </>
                    )} 
                </div>
                {/* conteine infor produto */}
                <div>
                    {loadingProductById ? <StyledSpiner/> : (
                        <StyledPageProductConteineInfo>
                            <h2>{dataProductById?.name}</h2>
                            {dataProductById?.reviews !== null && (
                                <Stars
                                    qtyStars={(dataProductById?.reviews?.reduce((ac, review) => ac + review.review.stars, 0) ?? 0) / (dataProductById?.reviews?.length || 0)}
                                /> 
                            )}
                            <p>{dataProductById?.description}</p>
                            <h4>R$ {dataProductById?.price}</h4>
                        </StyledPageProductConteineInfo>
                    )}
                </div>
                {/* conteine da comprar */}

                {TypeInterface != "UPDATE" && (
                    <StyledPageProductConteineButton>
                        <StyledPageProductConteineQty>
                            <button className="remove" onClick={() => {
                                if(qtyProduct > 1) {
                                    setQtyProduct(prevent => prevent - 1)
                                }
                            }}>-</button>
                            <span>{qtyProduct}</span>
                            <button className="add" onClick={() => {
                                if(qtyProduct >= 20) return
                                setQtyProduct(prevent => prevent + 1)
                            }}>+</button>
                        </StyledPageProductConteineQty>
                        <StyledPageProductConteinePriceQty>
                            <span>Preço</span>
                            {dataProductById?.price != null && (
                                <strong>${(Number.parseFloat(dataProductById?.price.toString().replace(/\./g, "")) * qtyProduct).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</strong>
                            )}
                            {/* <strong>${dataProductById?.price}</strong> */}
                        </StyledPageProductConteinePriceQty>
                        <Link to={`/${dataProductById?.id}/purchase`}>Comprar</Link>
                        <StyledPageProductButton $colorBtn="#333" $BgColorBtn="#fafafa">Adiciona ao carrinho</StyledPageProductButton>
                    </StyledPageProductConteineButton>
                )}
                


            </StyledPageProductInfor>
            {/* comentarios */}
            <div>
                {dataProductById && dataProductById!.reviews!.length > 0 && dataProductById.reviews?.map((review, index) => (
                    <div key={index} style={{padding: "1em", borderBottom: "1px solid #33333332", display: "flex", flexDirection: "column", gap: ".5em"}}> 
                        {/* Imagem  / perfil do user */}
                        <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                            <div style={{display: "flex", alignItems: "center", gap: "1em"}}>
                                <StyledPefilImg $perfilImg={`http://localhost:3000/${review.perfilImg}`} className="img"></StyledPefilImg>
                                <span>{review.name} {review.lastname}</span>
                            </div>
                            <span style={{fontSize: ".8em"}}>{review.date}</span>
                        </div>


                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <div style={{paddingLeft: "2em", display: "flex", flexDirection: "column", gap: ".3em"}}>
                                <div style={{display: "flex", gap: ".4em", fontSize: "1.6em", cursor: "pointer"}}>
                                    <div style={{color: review.review.stars >= 1 ? "#FFD700" : "#333"}}>★</div>
                                    <div style={{color: review.review.stars >= 2 ? "#FFD700" : "#333"}}>★</div>
                                    <div style={{color: review.review.stars >= 3 ? "#FFD700" : "#333"}}>★</div>
                                    <div style={{color: review.review.stars >= 4 ? "#FFD700" : "#333"}}>★</div>
                                    <div style={{color: review.review.stars >= 5 ? "#FFD700" : "#333"}}>★</div>
                                </div>
                                {/* comentarios */}
                                <div style={{width: "80%"}}>
                                    {review.review.comment}
                                </div>
                                {/* luga aonde vai fica todas as imagem */}
                                <div style={{display: "flex", gap: "1em"}}>
                                    <div style={{display: "flex", gap: "1em", alignItems: "center"}}>
                                        {/* preciso fazer um foreach para dd 4 a 5 img e fazer uma especie de pagination */}
                                        {review.review.reviewFile && review.review.reviewFile.length > 0 && review.review.reviewFile.slice(0, 4).map((img, index) => (
                                            <>
                                                <StyledImgProduct $perfilImg={`http://localhost:3000/${img}`} key={index} className="img"></StyledImgProduct>
                                            </>
                                        )) }
                                    </div>
                                    <div>
                                        {review.review.reviewFile && review.review.reviewFile.length >= 4 && review.review.reviewFile.slice(4, 5).map((value, index) => (
                                            <div style={{position: "absolute"}}>
                                                <button style={{position: "absolute", width: "100%", height: "100%", backgroundColor: "#3333337b", border: "none"}}>{review.review.reviewFile?.length}</button>
                                                <StyledImgProduct $perfilImg={`http://localhost:3000/${value}`} key={index} className="img"></StyledImgProduct>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div style={{position: "relative", cursor: "pointer"}}>
                                {/* {console.log(review.userId == JSON.parse(localStorage.getItem("user")!))} */}
                                <BsThreeDotsVertical onClick={() => setOpenThree(prevent => !prevent)}/>
                                {openThree && (
                                    <div style={{display: "flex", flexDirection: "column", textAlign: "center", width: "100px", position: "absolute", right: "0"}}>
                                    <span style={{border: "1px solid black", padding: ".5em"}} onClick={() => navigate(`/myPurchase/${dataProductById.id}/editForm`)}>Editar</span>
                                    <span style={{border: "1px solid black", borderTop: "none", padding: ".5em"}} onClick={() => handleDeleteComment(dataProductById.id)}>Deletar</span>
                                </div>
                                )}
                                
                            </div>
                        </div>


                    </div>
                ))}
            </div>
            {TypeInterface != "UPDATE" && (
                <StyledPageProductRecommendation>
                {loadingProducts ? (
                    <StyledSpiner />
                ) : (
                    <Swiper
                      spaceBetween={16}
                    slidesPerView={5}
                    scrollbar={{ draggable: true }}
                    modules={[Scrollbar]}
                    style={{ paddingBottom: '1rem' }}
                    >
                    {dataProducts &&
                        dataProducts
                        .filter(product => product.userId === dataProductById?.userId && product.id !== dataProductById.id)
                        .map(product => (
                            <SwiperSlide key={product.id} style={{minWidth: "200px"}}>
                                <StyledItensRecommendation>
                                    <StyledItensImg $img={`http://localhost:3000/${product.img[0]}`} />
                                    <StyledItensConteineInforProduct>
                                        <StyledItensInforProduct>
                                            <p>{product.name}</p>
                                            <p>
                                            <span>R$ </span>
                                            {product.price}.00
                                            </p>
                                        </StyledItensInforProduct>
                                        <StyledItensConteineBag>
                                            <MdOutlineShoppingBag />
                                        </StyledItensConteineBag>
                                    </StyledItensConteineInforProduct>
                                </StyledItensRecommendation>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </StyledPageProductRecommendation>
            )}
           

        </StylePageProduct>
    )
}
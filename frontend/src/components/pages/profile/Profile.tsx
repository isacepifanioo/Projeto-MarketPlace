import { useEffect, useState } from "react";
import { Filter } from "./components/Filter";
import { LeyoutProfile } from "./components/LeyoutProfile";
import { ListMyProduct } from "./components/ListMyProduct";
import { StyledSectionProfile } from "./Profile.styled";
import { ConfirmModal } from "../../layouts/model/Confirmation Modal/ConfirmModal";
import { IProducts } from "../../../interface/User";

export const Profile = () => {
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false)
  const [product, setProduct] = useState<IProducts>({description: '', id: '', img: [], name: '', price: '', qtyPurchase: 0, userId: ''})

  useEffect(() => {
    if(isOpen) {
      document.body.style.overflow = 'hidden'

    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen, product])
  return <StyledSectionProfile>
    {isOpen && <ConfirmModal id={product!.id} setIsOpen={setIsOpen} name={product!.name} price={product!.price} description={product!.description}/>}    <LeyoutProfile/>
    <Filter setSearch={setSearch}/>
    <ListMyProduct Search={search} setIsOpen={setIsOpen} setProduct={setProduct} isOpen={isOpen}/>
  </StyledSectionProfile>;
};

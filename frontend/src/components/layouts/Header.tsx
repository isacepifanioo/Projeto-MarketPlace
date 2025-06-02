import {
  StyledHeaders,
  StyledInnerHeaders,
  StyledProfileIcon,
} from "./Headers.styled";



import { LuSearch } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoStorefront } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState, useRef } from "react";
import { ContextAuth } from "../../context/useContextAuth";
import { IFnAuth } from "../../interface/FnContext";
import { useAxios } from "../../hook/useAxios";
import { StyledSpiner } from "../../spiner/Spine.styled";
import { BoxProfile } from "./box-profile/BoxProfile";

import {ContextCart} from './../../context/useContextCart'

import { UserRegister } from "../../interface/User";
import { Link } from "react-router-dom";
import { FormAddress } from "./model/formAddress/FormAddress";

export default function Header({setIsOpenDropDown}: {setIsOpenDropDown: React.Dispatch<React.SetStateAction<boolean>>}) {
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const { isAuth } = useContext(ContextAuth) as IFnAuth;
  const [isOpen, SetIsOPen] = useState(false);
  const { data, loading } = useAxios<UserRegister>({
    method: "get",
    url: `/users/${JSON.parse(localStorage.getItem("user") as string)}`,
  });
  const [profile, setProfile] = useState("");

  const boxProfileRef = useRef<HTMLDivElement>(null)
  const {qtyItens} = useContext(ContextCart);

  useEffect(() => {
    if (!data) return;
    if (!data.img) {
      setProfile("https://cdn-icons-png.flaticon.com/512/13/13626.png");
    } else {
      setProfile(`http://localhost:3000/${data.img}`);
    }
  }, [data]);

  useEffect(() => {
    function handleClickBoxProfile(event: MouseEvent) {
      if(boxProfileRef.current && !boxProfileRef.current.contains(event.target as Node)) {
        SetIsOPen(false)
      }
    }

    if(isOpenAddress) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    document.addEventListener('mousedown', handleClickBoxProfile)

    return () => {
      document.removeEventListener('mousedown', handleClickBoxProfile)
    }
  })

  return (
    <StyledHeaders>
      {isOpenAddress && <FormAddress setIsOpenAddress={setIsOpenAddress}/>}
      <StyledInnerHeaders>
        <div className="conteineLogo">
          <IoStorefront />
          <h1>Place</h1>
        </div>
        <div className="conteineLiks">
          <nav className="navBar">
            <Link to="/">Inicio</Link>
            <Link to="/myPurchase">Minhas Compras</Link>
            <Link to="#">Sobre</Link>
          </nav>
          <div className="navBar linksIcon">
            <div className="box-Links">
              <LuSearch />
              <p>Search</p>
            </div>
            <div className="box-Links" onClick={() => setIsOpenDropDown(true)}>
              <IoCartOutline />
              <p>Cart({qtyItens})</p>
            </div>
            <div className="box-Links">
              {loading ? (
                <StyledSpiner />
              ) : (
                <>
                  {isAuth ? (
                    <div ref={boxProfileRef}>
                      <StyledProfileIcon
                        $Imgprofile={profile}
                        className="icon-profile"
                        onClick={() =>
                          SetIsOPen((prevent) => !prevent)
                        }
                      />
                      {isOpen && <BoxProfile setIsOpenAddress={setIsOpenAddress}/>}
                    </div>
                  ) : (
                    <>
                      <CgProfile />
                      <Link to="/auth">Login</Link>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </StyledInnerHeaders>
    </StyledHeaders>
  );
}

// 20.8px

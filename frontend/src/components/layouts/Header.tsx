import {
  StyledHeaders,
  StyledInnerHeaders,
  StyledProfileIcon,
} from "./Headers.styled";

import { LuSearch } from "react-icons/lu";
import { IoCartOutline } from "react-icons/io5";
import { IoStorefront } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import { ContextAuth } from "../../context/useContextAuth";
import { IFnAuth } from "../../interface/FnContext";
import { useAxios } from "../../hook/useAxios";
import { StyledSpiner } from "../../spiner/Spine.styled";
import { BoxProfile } from "./box-profile/BoxProfile";

import { useRef } from "react";

export default function Header() {
  const { isAuth } = useContext(ContextAuth) as IFnAuth;
  const [isOpen, SetIsOPen] = useState(false);
  const { data, loading } = useAxios({
    method: "get",
    url: `/users/${JSON.parse(localStorage.getItem("user") as string)}`,
  });
  const [profile, setProfile] = useState("");

  const boxProfileRef = useRef<HTMLDivElement>(null)

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

    document.addEventListener('mousedown', handleClickBoxProfile)

    return () => {
      document.removeEventListener('mousedown', handleClickBoxProfile)
    }
  })

  return (
    <StyledHeaders>
      <StyledInnerHeaders>
        <div className="conteineLogo">
          <IoStorefront />
          <h1>Place</h1>
        </div>
        <div className="conteineLiks">
          <nav className="navBar">
            <a href="#">Inicio</a>
            <a href="#">Minhas Compras</a>
            <a href="#">Sobre</a>
          </nav>
          <div className="navBar linksIcon">
            <div className="box-Links">
              <LuSearch />
              <p>Search</p>
            </div>
            <div className="box-Links">
              <IoCartOutline />
              <p>Cart({0})</p>
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
                      {isOpen && <BoxProfile/>}
                    </div>
                  ) : (
                    <>
                      <CgProfile />
                      <p>Login</p>
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

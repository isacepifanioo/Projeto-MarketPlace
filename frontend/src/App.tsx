import Header from "./components/layouts/Header"
import { Outlet } from "react-router-dom"
import { StyledInnerGlobal } from "./GlobalStyele"
import { DropDownCart } from "./components/layouts/model/dropdownCart/DropdownCart"
import {useEffect, useRef, useState} from "react"

function App() {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)
  const refDropDown = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleToggleDropDown(e: MouseEvent) {
      if(refDropDown.current && !refDropDown.current.contains(e.target as Node)) {
        setIsOpenDropDown(false)
      }
    }

    if(isOpenDropDown) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    document.addEventListener("mousedown", handleToggleDropDown)

    return () => {
      document.removeEventListener("mousedown", handleToggleDropDown)
    }
  })

  return (
    <>
      <DropDownCart ref={refDropDown}  isOpen={isOpenDropDown}/>
      <Header setIsOpenDropDown={setIsOpenDropDown}/>
      <StyledInnerGlobal >
        <Outlet/>
      </StyledInnerGlobal>
    </>
  )
}

export default App

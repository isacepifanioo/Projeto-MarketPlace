import Header from "./components/layouts/Header"
import { Outlet } from "react-router-dom"
import { StyledInnerGlobal } from "./GlobalStyele"

function App() {

  return (
    <>
      <Header/>
      <StyledInnerGlobal>
        <Outlet/>
      </StyledInnerGlobal>
    </>
  )
}

export default App

import { StyledInnerGlobal } from "../../../GlobalStyele"
import { Outlet } from "react-router-dom"
import { HeadersProfiles } from "../../layouts/Headers.Profiles"

export const ProfileHome = () => {
  return (
    <>
        <HeadersProfiles/>
        <StyledInnerGlobal>
            <Outlet/>
        </StyledInnerGlobal>
    </>
  )
}

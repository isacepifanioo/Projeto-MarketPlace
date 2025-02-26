import { useState } from "react";
import { Filter } from "./components/Filter";
import { LeyoutProfile } from "./components/LeyoutProfile";
import { ListMyProduct } from "./components/ListMyProduct";
import { StyledSectionProfile } from "./Profile.styled";

export const Profile = () => {
  const [search, setSearch] = useState("");
  return <StyledSectionProfile>
    <LeyoutProfile/>
    <Filter setSearch={setSearch}/>
    <ListMyProduct Search={search}/>
  </StyledSectionProfile>;
};

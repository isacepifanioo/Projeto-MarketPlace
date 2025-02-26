import { IoSearch } from "react-icons/io5";
import {
  StyledConteineFilterSort,
  StyledFilter,
  StyledFilterSearch,
  StyledH1,
  StyledInput,
  StyledOption,
} from "./Filter.styled";
import React from "react";

export const Filter = ({setSearch}: {setSearch: React.Dispatch<React.SetStateAction<string>>}) => {
  return (
    <StyledFilter>
      <StyledH1>Meus Produtos</StyledH1>
      <StyledFilterSearch className="itens">
        <StyledInput
          type="text"
          name="search"
          id="search"
          placeholder="Pesquisa"
          onChange={(e) => setSearch(e.target.value)}
        />
        <IoSearch />
      </StyledFilterSearch>
      <StyledConteineFilterSort className="itens">
        <StyledOption name="sortOrder">
          <option value="desc">Mais Recente</option>
          <option value="asc">Mais Antigo</option>
        </StyledOption>
        <StyledOption name="sortStars">
          <option value="normal">Normal</option>
          <option value="BestRating">Mais Avaliado</option>
          <option value="LowestRating">Menos Avaliado</option>
        </StyledOption>
      </StyledConteineFilterSort>
    </StyledFilter>
  );
};

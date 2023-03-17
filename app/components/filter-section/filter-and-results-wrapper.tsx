import { useEffect, useState } from "react";

import type { IPokemonFull, IPokemonMini } from "~/interfaces";

import PokeAPIService from "~/utils/pokeapi-service";

import FilterWrapper from "./filters-wrapper";
import ResultsWrapper from "./results-wrapper";

const FilterSection = () => {
  const [allPokemon, setAllPokemon] = useState<
    Array<IPokemonFull | IPokemonMini>
  >([]);
  const [filters, setFilters] = useState({ name: "", type1: "", type2: "" });

  const mergeFilters = (newFilter: { [key: string]: string }) =>
    setFilters({ ...filters, ...newFilter });

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      setAllPokemon(await P.getAllPokemon());
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <FilterWrapper filters={filters} mergeFilters={mergeFilters} />
      <ResultsWrapper output={allPokemon} />
    </div>
  );
};

export default FilterSection;

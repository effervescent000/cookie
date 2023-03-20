import { useEffect, useState } from "react";

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

import PokeAPIService from "~/utils/pokeapi-service";

import FilterWrapper from "./filters-wrapper";
import ResultsWrapper from "./results-wrapper";

const FilterSection = ({
  allPokemon,
  setAllPokemon,
  merge,
}: {
  allPokemon: (IPokemonFull | IResourceListItem)[];
  setAllPokemon: (pokemon: (IPokemonFull | IResourceListItem)[]) => void;
  merge: (target: IPokemonFull) => void;
}) => {
  const [filters, setFilters] = useState({ name: "", type1: "", type2: "" });

  const mergeFilters = (newFilter: { [key: string]: string }) =>
    setFilters({ ...filters, ...newFilter });

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      setAllPokemon(await P.getAllPokemon());
    };
    fetchPokemon();
  }, [setAllPokemon]);

  return (
    <div>
      <FilterWrapper filters={filters} mergeFilters={mergeFilters} />
      <ResultsWrapper output={allPokemon} filters={filters} merge={merge} />
    </div>
  );
};

export default FilterSection;

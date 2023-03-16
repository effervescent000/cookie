import { useContext, useEffect, useState } from "react";

import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";

import FilterWrapper from "./filters-wrapper";
import ResultsWrapper from "./results-wrapper";

const FilterSection = () => {
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      setAllPokemon(await P.getAllPokemon());
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <FilterWrapper />
      <ResultsWrapper output={allPokemon} />
    </div>
  );
};

export default FilterSection;

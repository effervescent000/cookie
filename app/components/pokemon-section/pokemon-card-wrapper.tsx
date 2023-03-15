import { useEffect, useState, useContext } from "react";

import { PokemonContext } from "~/pokemon-context";
import PokeAPIService from "~/utils/pokeapi-service";

import TeamSelect from "./team-select";

const PokemonSection = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const { region: selectedRegion } = useContext(PokemonContext);

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      setAllPokemon(await P.getPokemonByRegion(selectedRegion));
    };
    fetchPokemon();
  }, [selectedRegion]);

  return <TeamSelect pokemonList={allPokemon} />;
};

export default PokemonSection;

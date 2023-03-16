import { useEffect, useState } from "react";

import PokeAPIService from "~/utils/pokeapi-service";

import TeamSelect from "./team-select";

const PokemonSection = () => {
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      setAllPokemon(await P.getAllPokemon());
    };
    fetchPokemon();
  }, []);

  return <TeamSelect pokemonList={allPokemon} />;
};

export default PokemonSection;

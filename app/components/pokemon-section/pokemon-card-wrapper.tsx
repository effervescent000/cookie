import { useEffect, useState } from "react";
import PokeAPIService from "~/utils/pokeapi-service";

import TeamSelect from "./team-select";

const PokemonSection = ({ selectedRegion }: { selectedRegion: string }) => {
  const [allPokemon, setAllPokemon] = useState([]);

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      setAllPokemon(await P.getAllPokemon());
    };
    fetchPokemon();
  }, [selectedRegion]);

  return <TeamSelect pokemonList={allPokemon} />;
};

export default PokemonSection;

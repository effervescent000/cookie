import { useEffect, useState, useContext } from "react";
import { PokemonContext } from "~/pokemon-context";

import PokeAPIService from "~/utils/pokeapi-service";

import PokemonFrame from "./pokemon-frame";

const PokemonSection = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const { team, bench } = useContext(PokemonContext);

  useEffect(() => {
    const fetchPokemon = async () => {
      const P = new PokeAPIService();
      setAllPokemon(await P.getAllPokemon());
    };
    fetchPokemon();
  }, []);

  return (
    <div>
      <PokemonFrame pokemon={team} />
      <PokemonFrame pokemon={bench} />
    </div>
  );
};

export default PokemonSection;

import type { IOptions } from "~/interfaces";
import PokemonInput from "./pokemon-card";

const TeamSelect = ({ pokemonList }: { pokemonList: IOptions[] }) => {
  return (
    <div>
      {[...Array(6)].map((_, i) => (
        <PokemonInput pokemonOptions={pokemonList} key={i} />
      ))}
    </div>
  );
};

export default TeamSelect;

import type { IOptions, IPokemonFull, IPokeSkeleton } from "~/interfaces";
import PokemonCard from "./pokemon-card";

const PokemonFrame = ({ pokemon }: { pokemon: IPokemonFull[] }) => {
  return (
    <div>
      {pokemon.map((poke, i) => (
        <PokemonCard key={i} targetPoke={poke} />
      ))}
    </div>
  );
};

export default PokemonFrame;

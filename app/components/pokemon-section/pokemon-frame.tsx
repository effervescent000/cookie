import type { IPokemonFull } from "~/interfaces";
import PokemonCard from "./pokemon-card";

const PokemonFrame = ({
  pokemon,
  title,
}: {
  pokemon: IPokemonFull[];
  title: string;
}) => {
  return (
    <div>
      <div>{title}</div>
      <div className="min-h-40 border border-light-blue">
        {pokemon.map((poke, i) => (
          <PokemonCard key={i} targetPoke={poke} />
        ))}
      </div>
    </div>
  );
};

export default PokemonFrame;

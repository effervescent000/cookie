import type { IPokemonFull } from "~/interfaces";
import PokemonCard from "./pokemon-card";

const PokemonFrame = ({
  pokemon,
  title,
  merge,
}: {
  pokemon: IPokemonFull[];
  title: string;
  merge: (arg0: IPokemonFull) => void;
}) => {
  return (
    <div>
      <div>{title}</div>
      <div className="min-h-40 border border-light-blue">
        {pokemon.map((poke, i) => (
          <PokemonCard key={i} targetPoke={poke} merge={merge} />
        ))}
      </div>
    </div>
  );
};

export default PokemonFrame;

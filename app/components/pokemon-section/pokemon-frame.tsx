import type { IPokeSkeleton } from "~/interfaces";

import { properCase } from "~/utils/text-utils";

import PokemonCard from "./pokemon-card";

const PokemonFrame = ({
  pokemon,
  location,
  scores,
}: {
  pokemon: IPokeSkeleton[];
  location: string;
  scores: { [key: number]: { [key: string]: number } };
}) => {
  return (
    <div>
      <div>{properCase(location)}</div>
      <div className="grid min-h-40 min-w-max grid-cols-2 gap-2 border border-light-blue">
        {pokemon.map((poke, i) => (
          <PokemonCard
            key={i}
            targetPoke={poke}
            currentLocation={location}
            scores={scores}
          />
        ))}
      </div>
    </div>
  );
};

export default PokemonFrame;

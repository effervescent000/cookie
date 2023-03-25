import type { IPokeSkeleton } from "~/interfaces";

import { properCase } from "~/utils/text-utils";

import PokemonCard from "./pokemon-card";

const PokemonFrame = ({
  pokemon,
  location,
}: {
  pokemon: IPokeSkeleton[];
  location: string;
}) => {
  return (
    <div data-cy={`frame-${location}`}>
      <div>{properCase(location)}</div>
      <div className="grid min-h-40 min-w-max grid-cols-2 gap-2 border border-light-blue">
        {pokemon.map((poke, i) => (
          <PokemonCard key={i} targetPoke={poke} currentLocation={location} />
        ))}
      </div>
    </div>
  );
};

export default PokemonFrame;

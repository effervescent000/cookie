import type { IPokemonFull } from "~/interfaces";
import { properCase } from "~/utils/text-utils";
import PokemonCard from "./pokemon-card";

const PokemonFrame = ({
  pokemon,
  location,
}: {
  pokemon: IPokemonFull[];
  location: string;
}) => {
  return (
    <div>
      <div>{properCase(location)}</div>
      <div className="min-h-40 border border-light-blue">
        {pokemon.map((poke, i) => (
          <PokemonCard key={i} targetPoke={poke} currentLocation={location} />
        ))}
      </div>
    </div>
  );
};

export default PokemonFrame;

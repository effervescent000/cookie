import type { IPokemonFull, IPokemonMini } from "~/interfaces";

import PokemonMiniCard from "./pokemon-mini-card";

const ResultsWrapper = ({
  output,
}: {
  output: Array<IPokemonFull | IPokemonMini>;
}) => {
  if (!output) return <div>Loading...</div>;

  return (
    <div>
      {output.map((poke) => (
        <PokemonMiniCard key={poke.name} poke={poke} />
      ))}
    </div>
  );
};

export default ResultsWrapper;

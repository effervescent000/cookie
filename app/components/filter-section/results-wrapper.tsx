import type { IFilters, IPokemonFull, IPokemonMini } from "~/interfaces";

import PokemonMiniCard from "./pokemon-mini-card";

const ResultsWrapper = ({
  output,
  filters,
}: {
  output: Array<IPokemonFull | IPokemonMini>;
  filters: IFilters;
}) => {
  return (
    <div>
      {output.map((poke) => (
        <PokemonMiniCard key={poke.name} poke={poke} />
      ))}
    </div>
  );
};

export default ResultsWrapper;

import { useMemo } from "react";
import _ from "lodash";

import type { IFilters, IPokemonFull, IResourceListItem } from "~/interfaces";
import { isFullPokemon } from "~/utils/type-guards";

import PokemonMiniCard from "./pokemon-mini-card";
import PokeAPIService from "~/utils/pokeapi-service";
import useWindowSize from "~/utils/hooks/use-window-size";

const ResultsWrapper = ({
  output,
  filters,
  merge,
}: {
  output: Array<IPokemonFull | IResourceListItem>;
  filters: IFilters;
  merge: (target: IPokemonFull) => void;
}) => {
  const P = new PokeAPIService();
  const { windowSize } = useWindowSize();

  const filteredOutput = useMemo(() => {
    const filteredByName = filters.name
      ? output.filter((poke) => poke.name.includes(filters.name.toLowerCase()))
      : output;
    const filteredByType =
      filters.type1 || filters.type2
        ? output.filter(
            (poke) =>
              !isFullPokemon(poke) ||
              poke.types.find(
                (type) =>
                  type.type.name === filters.type1 ||
                  type.type.name === filters.type2
              )
          )
        : output;
    return _.intersection(filteredByName, filteredByType);
  }, [filters, output]);

  const getGridSize = () => {
    if (windowSize <= 1080) {
      return "grid-cols-5";
    }
    return filteredOutput.length > 20 ? "grid-cols-8" : "grid-cols-5";
  };

  return (
    <div className={`grid gap-x-10 ${getGridSize()}`}>
      {filteredOutput.map((poke) => (
        <PokemonMiniCard
          key={poke.name}
          poke={poke}
          api={P}
          merge={merge}
          full={filteredOutput.length <= 20}
        />
      ))}
    </div>
  );
};

export default ResultsWrapper;

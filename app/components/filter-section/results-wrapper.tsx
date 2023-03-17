import { useEffect, useState, useMemo } from "react";
import _ from "lodash";

import type { IFilters, IPokemonFull, IPokemonMini } from "~/interfaces";
import { isFullPokemon } from "~/utils/type-guards";

import PokemonMiniCard from "./pokemon-mini-card";

const ResultsWrapper = ({
  output,
  filters,
}: {
  output: Array<IPokemonFull | IPokemonMini>;
  filters: IFilters;
}) => {
  const filteredOutput = useMemo(() => {
    const filteredByName = filters.name
      ? output.filter((poke) => poke.name.includes(filters.name))
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

  return (
    <div>
      {filteredOutput.map((poke) => (
        <PokemonMiniCard key={poke.name} poke={poke} />
      ))}
    </div>
  );
};

export default ResultsWrapper;

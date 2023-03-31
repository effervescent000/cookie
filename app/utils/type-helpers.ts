import type { IPokemonFull } from "~/interfaces";

import { GEN_LOOKUP_BY_ROMAN_NUMERAL } from "~/constants/versions-constants";

export const getPokemonTypes = (pokemon: IPokemonFull, gen: number) => {
  if (gen >= 6) return pokemon.types;
  const foundTypes = pokemon.past_types.find(
    ({ generation }) =>
      GEN_LOOKUP_BY_ROMAN_NUMERAL[generation.name.split("-")[1].toUpperCase()]
        .value >= gen
  );
  return foundTypes?.types || pokemon.types;
};

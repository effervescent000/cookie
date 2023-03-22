import { DAMAGE_RELATION_VALUES } from "~/constants/types-constants";
import type { IPokemonFull } from "~/interfaces";
import type PokeAPIService from "./pokeapi-service";

export const makeDefensiveValues = async (
  pokemon: IPokemonFull,
  P: PokeAPIService
) => {
  const thisPokeValues: { [key: string]: number } = {};
  for (const typeObj of pokemon.types) {
    const typeName = typeObj.type.name;
    const typeResponse = await P.getType(typeName);
    Object.entries(typeResponse.damage_relations).forEach(
      ([damage_level, relatedTypes]) => {
        if (damage_level.includes("_from")) {
          relatedTypes.forEach((relatedType) => {
            thisPokeValues[relatedType.name] =
              (thisPokeValues[relatedType.name] || 0) +
              DAMAGE_RELATION_VALUES[damage_level];
          });
        }
      }
    );
  }
  return thisPokeValues;
};

export const makeTotalsStats = (pokemon: IPokemonFull) =>
  pokemon.stats.reduce((total, acc) => total + acc.base_stat, 0);

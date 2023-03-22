import { DAMAGE_RELATION_VALUES } from "~/constants/types-constants";
import type { IMoveResponse, IPokemonFull } from "~/interfaces";
import PokeAPIService from "./pokeapi-service";

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
              (thisPokeValues[relatedType.name] || 1) *
              DAMAGE_RELATION_VALUES[damage_level];
          });
        }
      }
    );
  }
  return thisPokeValues;
};

export const scoreDefValues = (values: {
  [key: string]: number;
}): { [key: string]: number } => {
  const scores: { [key: number]: number } = {
    0: 2,
    0.25: 1.5,
    0.5: 1,
    1: 0,
    2: -1,
    4: -2,
  };
  return Object.entries(values).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: scores[value] }),
    {}
  );
};

export const scoreOffValues = (values: {
  [key: string]: number;
}): { [key: string]: number } => {
  const scores: { [key: number]: number } = {
    0: 0,
    0.25: 0,
    0.5: 0,
    1: 0.5,
    2: 1,
    4: 2,
  };
  return Object.entries(values).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: scores[value] }),
    {}
  );
};

export const makeTotalsStats = (pokemon: IPokemonFull) =>
  pokemon.stats.reduce((total, acc) => total + acc.base_stat, 0);

export const diminishReturns = (num: number): number => {
  const cap = 10;
  if (num > 3) {
    return (cap * num) / (num + 7);
  }
  return num;
};

const getStat = (pokemon: IPokemonFull, stat: string) =>
  pokemon.stats.find(({ stat: { name } }) => name === stat)?.base_stat;

const LEVEL = 5;
const DEFENSE = 90;

export const scoreMoves = async (
  pokemon: IPokemonFull,
  versionGroup: string
) => {
  const P = new PokeAPIService();
  const scores: { [key: string]: number } = {};

  const filteredMoves = pokemon.moves
    .map((move) => ({
      ...move,
      version_group_details: move.version_group_details.filter(
        (detail) => detail.version_group.name === versionGroup
      ),
    }))
    .filter(
      (move) =>
        move.version_group_details[0] &&
        move.version_group_details[0].move_learn_method.name !== "machine"
    );

  for (const move of filteredMoves) {
    const fullMove = await P.getMove(move.move.name);
    scores[fullMove.name] = calcDamage({ pokemon, move: fullMove });
  }
  return scores;
};

export const calcDamage = ({
  pokemon,
  move,
}: {
  pokemon: IPokemonFull;
  move: IMoveResponse;
}) =>
  move.power
    ? ((((2 * LEVEL) / 5 + 2) *
        (move.power *
          (move.meta.min_hits && move.meta.max_hits
            ? (move.meta.min_hits + move.meta.max_hits) / 2
            : 1)) *
        (getStat(
          pokemon,
          move.damage_class.name === "physical" ? "attack" : "special-attack"
        ) || 0)) /
        DEFENSE /
        50 +
        2) *
      (1 + (move.meta.crit_rate + 0.0625) * 1.5) *
      (move.accuracy ? Math.min(move.accuracy, 100) / 100 : 1)
    : 0;

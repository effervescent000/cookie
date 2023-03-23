import _ from "lodash";

import type {
  IMoveResponse,
  IPokemonFull,
  IPokeSkeleton,
  IValues,
} from "~/interfaces";

import {
  DAMAGE_RELATION_VALUES,
  TYPE_LOOKUP,
} from "~/constants/types-constants";
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
  const diff = _.difference(
    Object.keys(TYPE_LOOKUP),
    Object.keys(thisPokeValues)
  );
  diff.forEach((t) => (thisPokeValues[t] = 1));
  return thisPokeValues;
};

export const sumValues = (values: IValues) =>
  Object.values(values).reduce(
    (total, cur) => total + diminishReturns(cur.finalValue),
    0
  );

export const makeTeamDefensiveValues = async (
  pokemon: IPokeSkeleton[],
  P: PokeAPIService
) => {
  const newValues: IValues = {};
  const fullPokes = await P.getPokemonByName(pokemon.map(({ name }) => name));
  // const startTime = Date.now();
  const pokeValues = await Promise.all(
    fullPokes.map(async (pokemon) => {
      const thisPokeValues = scoreDefValues(
        await makeDefensiveValues(pokemon, P)
      );
      return { name: pokemon.name, values: thisPokeValues, id: pokemon.id };
    })
  );
  pokeValues.forEach((pv) =>
    Object.entries(pv.values).forEach(([key, value]) => {
      newValues[key] = {
        finalValue: (newValues[key] ? newValues[key].finalValue : 0) + value,
        details: [
          ...(newValues[key] ? newValues[key].details : []),
          [pv.name, value],
        ],
      };
    })
  );

  // console.log(`creating team defensives took ${Date.now() - startTime}ms`);
  return newValues;
};

export const makeOffensiveValues = async (
  pokemon: IPokeSkeleton,
  P: PokeAPIService
) => {
  const thisPokeValues: { [key: string]: number } = {};
  const selectedMoves = await Promise.all(
    Object.values(pokemon.moves)
      .filter((move) => !!move)
      .map(async (move) => {
        return await P.getMove(move);
      })
  );
  const moveTypes = await Promise.all(
    selectedMoves.map(async (move) => await P.getType(move.type.name))
  );
  moveTypes.forEach((move) => {
    Object.entries(move.damage_relations).forEach(
      ([damage_level, relatedTypes]) => {
        if (damage_level.includes("_to")) {
          relatedTypes.forEach((relatedType) => {
            if (
              thisPokeValues[relatedType.name] === undefined ||
              thisPokeValues[relatedType.name] <
                DAMAGE_RELATION_VALUES[damage_level]
            ) {
              thisPokeValues[relatedType.name] =
                DAMAGE_RELATION_VALUES[damage_level];
            }
          });
        }
      }
    );
  });
  return thisPokeValues;
};

export const makeTeamOffensiveValues = async (
  pokemon: IPokeSkeleton[],
  P: PokeAPIService
) => {
  const newValues: IValues = {};
  const pokeValues = await Promise.all(
    pokemon.map(async (poke) => {
      const thisPokeValues = scoreOffValues(await makeOffensiveValues(poke, P));
      return { name: poke.name, values: thisPokeValues, id: poke.id };
    })
  );
  pokeValues.forEach((pv) =>
    Object.entries(pv.values).forEach(([key, value]) => {
      newValues[key] = {
        finalValue: (newValues[key] ? newValues[key].finalValue : 0) + value,
        details: [
          ...(newValues[key] ? newValues[key].details : []),
          [pv.name, value],
        ],
      };
    })
  );
  return newValues;
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
  } else if (num < -3) {
    return Math.pow(3, (num * -1) / 3) * -1;
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

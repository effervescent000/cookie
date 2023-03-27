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
import sortArray from "sort-array";

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
  const fullPokes = await P.getPokemonByName(pokemon.map(({ name }) => name));
  const processedValues: IValues = {};
  const pokeValues = await Promise.all(
    fullPokes.map(async (pokemon) => {
      const thisPokeValues = scoreDefValues(
        await makeDefensiveValues(pokemon, P)
      );
      return { name: pokemon.name, values: thisPokeValues, id: pokemon.id };
    })
  );

  pokeValues.forEach((pv) => {
    Object.entries(pv.values).forEach(([key, value]) => {
      const targetValue = processedValues[key];
      processedValues[key] = {
        finalValue: (targetValue?.finalValue || 0) + value,
        details: [...(targetValue?.details || []), [pv.name, value]],
      };
    });
  });

  return {
    raw: pokeValues.reduce((x, y) => ({ ...x, [y.name]: y }), {}),
    final: processedValues,
  };
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
  const finalValues: { final: number; raw: IValues } = { raw: {}, final: 0 };
  const pokeValues: {
    name: string;
    values: { [key: string]: number };
    id: number;
  }[] = await Promise.all(
    pokemon.map(async (poke) => {
      const thisPokeValues = scoreOffValues(await makeOffensiveValues(poke, P));
      return { name: poke.name, values: thisPokeValues, id: poke.id };
    })
  );

  pokeValues.forEach((pv) => {
    Object.entries(pv.values).forEach(([key, value]) => {
      const targetValue = finalValues.raw[key];
      finalValues.raw[key] = {
        finalValue: (targetValue?.finalValue || 0) + value,
        details: [...(targetValue?.details || []), [pv.name, value]],
      };
    });
  });
  return {
    raw: pokeValues.reduce((x, y) => ({ ...x, [y.name]: y }), {}),
    final: finalValues.raw,
  };
};

export const compileTeamValues = (teamValues: {
  [key: string]: { values: { [key: string]: number } };
}) => {
  const finalValues: { [key: string]: number } = {};
  Object.values(teamValues).forEach(({ values }) => {
    Object.entries(values).forEach(([key, value]) => {
      finalValues[key] = (finalValues[key] || 0) + value;
    });
  });
  return finalValues;
};

export const sumCompiledTeamValues = (values: { [key: string]: number }) =>
  Object.values(values).reduce((x, y) => x + diminishReturns(y), 0);

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

export const scoreTotalStats = (pokemon: IPokemonFull) => {
  const stats = makeTotalsStats(pokemon);
  // for now just clean it up and return.
  // in the future we will make extra adjustments.
  return Math.round(stats / 5) / 10;
};

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
const DEFENSE = 70;

export const scoreAllMoves = async ({
  pokemon,
  versionGroup,
  knownMoves,
}: {
  pokemon: IPokemonFull;
  versionGroup: string;
  knownMoves: string[];
}) => {
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
        !knownMoves.includes(move.move.name) &&
        move.version_group_details[0].move_learn_method.name !== "machine"
    );
  const fullMoves = await Promise.all(
    filteredMoves.map(async (move) => await P.getMove(move.move.name))
  );
  fullMoves.forEach((move) => {
    scores[move.name] = calcDamage({ pokemon, move });
  });

  return scores;
};

export const scoreMoves = async ({
  pokemon,
  fullPokemon,
  versionGroup,
}: {
  pokemon: IPokeSkeleton;
  fullPokemon: IPokemonFull;
  versionGroup: string;
}) => {
  const P = new PokeAPIService();
  const scores: { [key: string]: number } = {};

  const filteredMoves = _.uniq(
    Object.values(pokemon.moves).filter((move) => !!move)
  );
  const fullMoves = await Promise.all(
    filteredMoves.map(async (move) => await P.getMove(move))
  );
  fullMoves.forEach((move) => {
    scores[move.name] =
      Math.round(calcDamage({ pokemon: fullPokemon, move }) * 10) / 10;
  });
  if (Object.keys(scores).length < 4) {
    const allMovesScored = Object.entries(
      await scoreAllMoves({
        pokemon: fullPokemon,
        versionGroup,
        knownMoves: filteredMoves,
      })
    ).map(([key, value]) => ({ name: key, score: value }));
    sortArray(allMovesScored, { by: "score", order: "desc" });
    const slicedMoves = allMovesScored.slice(0, 4 - Object.keys(scores).length);
    slicedMoves.forEach((move) => {
      scores[move.name] = move.score;
    });
  }
  scores.finalScore =
    Math.round(Object.values(scores).reduce((x, y) => x + y, 0)) / 5;
  return scores;
};

export const calcDamage = ({
  pokemon,
  move,
}: {
  pokemon: IPokemonFull;
  move: IMoveResponse;
}) => {
  try {
    const damage = move.power
      ? ((((2 * LEVEL) / 5 + 2) *
          (move.power *
            (move.meta?.min_hits && move.meta?.max_hits
              ? (move.meta.min_hits + move.meta.max_hits) / 2
              : 1)) *
          (getStat(
            pokemon,
            move.damage_class.name === "physical" ? "attack" : "special-attack"
          ) || 0)) /
          DEFENSE /
          50 +
          2) *
        (1 + ((move.meta?.crit_rate || 0) + 0.0625) * 1.5) *
        (move.accuracy ? Math.min(move.accuracy, 100) / 100 : 1) *
        (pokemon.types
          .map(({ type: { name } }) => name)
          .includes(move.type.name)
          ? 1.5
          : 1)
      : 0;
    return damage;
  } catch (error) {
    console.log(`move ${move.name} is malformed`);
    return 0;
  }
};

export const filterKey = (
  obj: { [key: string | number]: any },
  key: string
) => {
  const result = Object.keys(obj)
    .filter((existingKey) => existingKey !== key)
    .reduce(
      (acc, cur) => ({ ...acc, [cur]: obj[cur] }),
      {} as { [key: string | number]: any }
    );
  return result;
};

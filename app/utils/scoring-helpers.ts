import _ from "lodash";
import sortArray from "sort-array";

import type {
  IMove,
  IMoveResponse,
  IMoveScores,
  IPokemonFull,
  IPokeSkeleton,
  IResourceListItem,
  ITeamTypeScores,
  IValues,
} from "~/interfaces";

import PokeAPIService from "./pokeapi-service";
import { DAMAGE_RELATION_VALUES, getTypes } from "~/constants/types-constants";
import { GEN_LOOKUP_BY_ROMAN_NUMERAL } from "~/constants/versions-constants";
import {
  calcDamage,
  diminishReturns,
  filterKey,
  roundToPrecision,
} from "./helpers";
import { getPokemonTypes } from "./type-helpers";
import { makeLookup } from "./general-utils";

export const scoreSingleMove = async ({
  pokemon,
  move,
  gen,
  target,
  P,
}: {
  pokemon: IPokemonFull;
  move: IMoveResponse;
  gen: number;
  target?: IPokemonFull;
  P?: PokeAPIService;
}) => {
  const dmg = await calcDamage({ pokemon, move, gen, target, P });
  const score = dmg * (move.pp && move.pp <= 10 ? 1 - 100 / move.pp / 100 : 1);
  return { dmg: roundToPrecision(dmg, 1), score: roundToPrecision(score, 1) };
};

export const scoreMoves = async ({
  pokemon,
  fullPokemon,
  versionGroup,
  gen,
  target,
  onlyKnown,
}: {
  pokemon: IPokeSkeleton;
  fullPokemon: IPokemonFull;
  versionGroup: string;
  gen: number;
  target?: IPokemonFull;
  onlyKnown?: boolean;
}) => {
  const P = new PokeAPIService();
  const scores: { [key: string]: { dmg: number; score: number } } = {};

  const thisPokeMoves = _.uniq(
    Object.values(pokemon.moves).filter((move) => !!move)
  );

  let movesToScore: IMove[] = [];
  if (onlyKnown) {
    const knownMoves = Object.values(pokemon.moves);
    movesToScore = fullPokemon.moves.filter((move) =>
      knownMoves.includes(move.move.name)
    );
  } else {
    movesToScore = fullPokemon.moves
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
  }

  const scoredMoves = await Promise.all(
    movesToScore.map(async (move) => ({
      name: move.move.name,
      score: await scoreSingleMove({
        move: await P.getMove(move.move.name),
        pokemon: fullPokemon,
        gen,
        target,
        P,
      }),
    }))
  );
  scoredMoves.forEach((move) => {
    scores[move.name] = move.score;
  });

  const movesToSort = Object.entries(scores).map(([key, value]) => ({
    name: key,
    value: value.score,
  }));
  sortArray(movesToSort, { by: "value", order: "desc" });
  const finalMoves = [
    ...thisPokeMoves.map((move) => ({ name: move, value: scores[move].score })),
    ...movesToSort.slice(0, 4 - thisPokeMoves.length),
  ];
  const final = Math.round(finalMoves.reduce((x, y) => x + y.value, 0)) / 5;
  return { final, moves: scores };
};

export const makeDefensiveValues = async ({
  pokemon,
  P,
  gen,
}: {
  pokemon: IPokemonFull;
  P: PokeAPIService;
  gen: number;
}) => {
  const thisPokeValues: { [key: string]: number } = {};
  for (const typeObj of getPokemonTypes(pokemon, gen)) {
    const typeName = typeObj.type.name;
    const typeResponse = await P.getType(typeName);
    let relations = typeResponse.damage_relations;
    if (gen < 6) {
      const foundRelations = typeResponse.past_damage_relations.find(
        ({ generation }) =>
          GEN_LOOKUP_BY_ROMAN_NUMERAL[
            generation.name.split("-")[1].toUpperCase()
          ].value >= gen
      );
      if (foundRelations) {
        relations = foundRelations.damage_relations;
      }
    }
    Object.entries(relations).forEach(([damage_level, relatedTypes]) => {
      if (damage_level.includes("_from")) {
        relatedTypes.forEach((relatedType: IResourceListItem) => {
          thisPokeValues[relatedType.name] =
            (thisPokeValues[relatedType.name] || 1) *
            DAMAGE_RELATION_VALUES[damage_level];
        });
      }
    });
  }
  const diff = _.difference(
    getTypes(gen).map(({ key }) => key),
    Object.keys(thisPokeValues)
  );
  diff.forEach((t) => (thisPokeValues[t] = 1));
  return thisPokeValues;
};

export const makeTeamDefensiveValues = async ({
  pokemon,
  P,
  gen,
}: {
  pokemon: IPokeSkeleton[];
  P: PokeAPIService;
  gen: number;
}) => {
  const fullPokes = await P.getPokemonByName(pokemon.map(({ name }) => name));
  const processedValues: IValues = {};
  const pokeValues = await Promise.all(
    fullPokes.map(async (pokemon) => {
      const thisPokeValues = scoreDefValues(
        await makeDefensiveValues({ pokemon, P, gen })
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

export const makeOffensiveValues = async ({
  pokemon,
  P,
  gen,
}: {
  pokemon: IPokeSkeleton;
  P: PokeAPIService;
  gen: number;
}) => {
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
    let relations = move.damage_relations;
    if (gen < 6) {
      const foundRelations = move.past_damage_relations.find(
        ({ generation }) =>
          GEN_LOOKUP_BY_ROMAN_NUMERAL[
            generation.name.split("-")[1].toUpperCase()
          ].value >= gen
      );
      if (foundRelations) {
        relations = foundRelations.damage_relations;
      }
    }
    Object.entries(relations).forEach(([damage_level, relatedTypes]) => {
      if (damage_level.includes("_to")) {
        relatedTypes.forEach((relatedType: IResourceListItem) => {
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
    });
  });
  const diff = _.difference(
    getTypes(gen).map(({ key }) => key),
    Object.keys(thisPokeValues)
  );
  diff.forEach((t) => (thisPokeValues[t] = 1));
  return thisPokeValues;
};

export const makeTeamOffensiveValues = async ({
  pokemon,
  P,
  gen,
}: {
  pokemon: IPokeSkeleton[];
  P: PokeAPIService;
  gen: number;
}) => {
  const finalValues: { final: number; raw: IValues } = { raw: {}, final: 0 };
  const pokeValues: {
    name: string;
    values: { [key: string]: number };
    id: number;
  }[] = await Promise.all(
    pokemon.map(async (poke) => {
      const thisPokeValues = scoreOffValues(
        await makeOffensiveValues({ pokemon: poke, P, gen })
      );
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

export const sumValues = (values: IValues) =>
  Object.values(values).reduce(
    (total, cur) => total + diminishReturns(cur.finalValue),
    0
  );

export const compileTeamValues = (teamValues: {
  [pokemon: string]: { values: { [type: string]: number } };
}) => {
  const finalValues: { [type: string]: number } = {};
  Object.values(teamValues).forEach(({ values }) => {
    Object.entries(values).forEach(([key, value]) => {
      finalValues[key] = (finalValues[key] || 0) + value;
    });
  });
  return finalValues;
};

export const sumCompiledTeamValues = (values: { [key: string]: number }) =>
  Object.values(values).reduce((x, y) => x + diminishReturns(y), 0);

export const makeDelta = ({
  teamDefScores,
  teamOffScores,
  scoringPokeOffValues,
  scoringPokeDefValues,
  teamPokemon,
  scoringPokemon,
  moveScores,
  statScores,
}: {
  teamDefScores: ITeamTypeScores;
  teamOffScores: ITeamTypeScores;
  scoringPokeOffValues: { name: string; values: { [key: string]: number } };
  scoringPokeDefValues: { name: string; values: { [key: string]: number } };
  teamPokemon: IPokeSkeleton;
  scoringPokemon: IPokeSkeleton;
  moveScores: IMoveScores;
  statScores: { [id: number]: number | undefined };
}): number => {
  const modifiedTeamDefScores = filterKey(teamDefScores.raw, teamPokemon.name);
  modifiedTeamDefScores[scoringPokemon.name] = scoringPokeDefValues;
  const modifiedTeamOffScores = filterKey(teamOffScores.raw, teamPokemon.name);
  modifiedTeamOffScores[scoringPokemon.name] = scoringPokeOffValues;

  const modifiedTotalScore =
    sumCompiledTeamValues(compileTeamValues(modifiedTeamDefScores)) +
    sumCompiledTeamValues(compileTeamValues(modifiedTeamOffScores)) +
    (_.get(moveScores, `[${scoringPokemon.id}].final`) || 0) +
    (statScores[scoringPokemon.id] || 0);

  const originalTotalScore =
    teamOffScores.final +
    teamDefScores.final +
    (_.get(moveScores, `[${teamPokemon.id}].final`) || 0) +
    (statScores[teamPokemon.id] || 0);

  return roundToPrecision(modifiedTotalScore - originalTotalScore, 1);
};

export const scoreTeamMovesVsTarget = async ({
  team,
  target,
  P,
  gen,
  versionGroup,
}: {
  team: IPokeSkeleton[];
  target: IPokemonFull;
  P: PokeAPIService;
  gen: number;
  versionGroup: string;
}) => {
  const teamFullPokemon = makeLookup(
    await P.getPokemonByName(team.map(({ name }) => name)),
    "name"
  );
  const allMovesScored = await Promise.all(
    team.map(async (attacker) => {
      const scoreResult = await scoreMoves({
        pokemon: attacker,
        fullPokemon: teamFullPokemon[attacker.name],
        versionGroup,
        gen,
        target,
        onlyKnown: true,
      });
      const arrayedResult = Object.entries(scoreResult.moves).map(
        ([key, value]) => ({ name: key, score: value.score })
      );
      sortArray(arrayedResult, { by: "score", order: "desc" });

      return {
        pokemon: attacker,
        scores: arrayedResult,
      };
    })
  );
  sortArray(allMovesScored, {
    by: "score",
    computed: { score: (pokemon) => pokemon.scores[0].score },
    order: "desc",
  });
  return allMovesScored;
};

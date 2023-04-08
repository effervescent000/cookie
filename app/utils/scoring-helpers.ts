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
import {
  DEF_SCORING_VALUES,
  OFF_SCORING_VALUES,
} from "~/constants/scoring-constants";
import { getMoveName } from "./text-utils";

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
    Object.values(pokemon.moves)
      .map((move) => getMoveName(move))
      .filter((move) => !!move)
  );

  let movesToScore: (IMove | { move: { name: string } })[] = [];
  if (onlyKnown) {
    movesToScore = thisPokeMoves.map((move) => ({ move: { name: move } }));
  } else {
    movesToScore = _.uniqBy(
      [
        ...fullPokemon.moves
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
          ),
        ...thisPokeMoves.map((move) => ({ move: { name: move } })),
      ],
      "move.name"
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
      const thisPokeValues = scoreValues({
        values: await makeDefensiveValues({ pokemon, P, gen }),
        scores: DEF_SCORING_VALUES,
      });
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
      .filter((move) => !!move && !!getMoveName(move))
      .map(async (move) => await P.getMove(getMoveName(move)))
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
      const thisPokeValues = scoreValues({
        values: await makeOffensiveValues({ pokemon: poke, P, gen }),
        scores: OFF_SCORING_VALUES,
      });
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

export const scoreValues = ({
  values,
  scores,
}: {
  values: {
    [key: string]: number;
  };
  scores: {
    [key: number]: number;
  };
}): { [key: string]: number } => {
  const scoredValues = Object.entries(values).reduce(
    (acc, [key, value]) => ({ ...acc, [key]: scores[value] }),
    { final: 0 }
  );

  const SCORE_CURVE_CAP = 10;
  const finalValue = Object.values(scoredValues).reduce((x, y) => x + y, 0);
  scoredValues.final =
    finalValue + (SCORE_CURVE_CAP - Math.min(SCORE_CURVE_CAP, finalValue)) / 3;

  return scoredValues;
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
  scoringPokeDefValues,
  teamOffScores,
  scoringPokeOffValues,
  teamPokemon,
  scoringPokemon,
  moveScores,
  statScores,
}: {
  teamDefScores: ITeamTypeScores;
  scoringPokeDefValues: { name: string; values: { [key: string]: number } };
  teamOffScores: ITeamTypeScores;
  scoringPokeOffValues: { name: string; values: { [key: string]: number } };
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
    teamDefScores.final +
    teamOffScores.final +
    (_.get(moveScores, `[${teamPokemon.id}].final`) || 0) +
    (statScores[teamPokemon.id] || 0);

  return roundToPrecision(modifiedTotalScore - originalTotalScore, 1);
};

const getAttackerScoreMod = (attackerVulnerability: number) => {
  if (attackerVulnerability === 0) return 0.25;
  if (attackerVulnerability >= 1) return attackerVulnerability;
  return attackerVulnerability + (1 - attackerVulnerability) / 3;
};

export const scoreTeamMovesVsTarget = async ({
  team,
  targetFull,
  targetMoves,
  P,
  gen,
  versionGroup,
}: {
  team: IPokeSkeleton[];
  targetFull: IPokemonFull;
  targetMoves?: { [move: string]: IMoveResponse };
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
        target: targetFull,
        onlyKnown: true,
      });
      const attackerDefenses = await makeDefensiveValues({
        pokemon: teamFullPokemon[attacker.name],
        P,
        gen,
      });

      const knownMovesLength = targetMoves
        ? Object.keys(targetMoves).length
        : 0;

      const attackerVulnerability = getPokemonTypes(targetFull, gen)
        .map(({ type: { name } }) => name)
        .reduce((x, y) => x * (attackerDefenses[y] || 1), 1);

      const attackerScoreMod = getAttackerScoreMod(attackerVulnerability);

      const targetDamage = targetMoves
        ? await Promise.all(
            Object.values(targetMoves).map(
              async (move) =>
                (await calcDamage({
                  pokemon: targetFull,
                  move,
                  gen,
                  target: teamFullPokemon[attacker.name],
                  P,
                })) / 4
            )
          )
        : [];

      const arrayedResult = Object.entries(scoreResult.moves).map(
        ([key, value]) => ({
          name: key,
          score: roundToPrecision(
            targetDamage.length > 0 && knownMovesLength > 0
              ? targetDamage.reduce((x, y) => x - y, value.score) /
                  (attackerScoreMod -
                    (attackerScoreMod - 1) * ((4 - knownMovesLength) / 4))
              : value.score / attackerScoreMod,
            1
          ),
        })
      );
      // sortArray(arrayedResult, { by: "score", order: "desc" });

      return {
        pokemon: attacker,
        scores: arrayedResult,
      };
    })
  );

  console.log(allMovesScored);
  const flattenedScoredMoves = allMovesScored.reduce(
    (acc, cur) => [
      ...acc,
      ...cur.scores.map((score) => ({
        pokemon: cur.pokemon,
        move: score.name,
        score: score.score,
      })),
    ],
    [] as { pokemon: IPokeSkeleton; move: string; score: number }[]
  );
  sortArray(flattenedScoredMoves, {
    by: "score",
    computed: {
      score: (move) => move.score,
    },
    order: "desc",
  });
  return flattenedScoredMoves;
};

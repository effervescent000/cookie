import type { IMove, IMoveResponse, IPokemonFull } from "~/interfaces";
import type PokeAPIService from "./pokeapi-service";

import { makeDefensiveValues } from "./scoring-helpers";
import { getPokemonTypes } from "./type-helpers";

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
    return (cap * num) / (num + 6);
  } else if (num < -3) {
    return Math.pow(3, (num * -1) / 3) * -1;
  }
  return num;
};

export const roundToPrecision = (value: number, numDigits: number) => {
  const modifier = Math.pow(10, numDigits);
  return Math.round(value * modifier) / modifier;
};

const getStat = (pokemon: IPokemonFull, stat: string) =>
  pokemon.stats.find(({ stat: { name } }) => name === stat)?.base_stat;

const LEVEL = 5;
const DEFENSE = 70;

export const calcDamage = async ({
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
  try {
    const baseDamage = move.power
      ? ((((2 * LEVEL) / 5 + 2) *
          (move.power *
            (move.meta?.min_hits && move.meta?.max_hits
              ? (move.meta.min_hits + move.meta.max_hits) / 2
              : 1)) *
          (getStat(
            pokemon,
            move.damage_class.name === "physical" ? "attack" : "special-attack"
          ) || 0)) /
          ((target &&
            getStat(
              target,
              move.damage_class.name === "physical"
                ? "defense"
                : "special-defense"
            )) ||
            DEFENSE) /
          50 +
          2) *
        (1 +
          calcCritRate({ critStage: move.meta?.crit_rate || 0, gen }) * 1.5) *
        (move.accuracy ? Math.min(move.accuracy, 100) / 100 : 1)
      : 0;

    const defensiveMultiplier =
      target && P
        ? (await makeDefensiveValues({ pokemon: target, gen, P }))[
            move.type.name
          ]
        : 1;

    const damageWithModifiers =
      baseDamage *
      (getPokemonTypes(pokemon, gen)
        .map(({ type: { name } }) => name)
        .includes(move.type.name)
        ? 1.5
        : 1) *
      defensiveMultiplier;
    return damageWithModifiers;
  } catch (error) {
    console.log(`move ${move.name} is malformed, error: ${error}`);
    return 0;
  }
};

export const calcCritRate = ({
  critStage,
  gen,
}: {
  critStage: number;
  gen: number;
}) => {
  const critRateError = new Error("Invalid crit rate passed to calcCritRate");
  if (gen === 2) {
    switch (critStage) {
      case 0:
        return 17 / 256;
      case 1:
        return 1 / 8;
      case 2:
        return 1 / 4;
      default:
        throw critRateError;
    }
  }
  if (gen >= 3 && gen <= 5) {
    switch (critStage) {
      case 0:
        return 1 / 16;
      case 1:
        return 1 / 8;
      case 2:
        return 1 / 4;
      default:
        throw critRateError;
    }
  }
  if (gen === 6) {
    switch (critStage) {
      case 0:
        return 1 / 16;
      case 1:
        return 1 / 8;
      case 2:
        return 1 / 2;
      default:
        throw critRateError;
    }
  }
  if (gen >= 7) {
    switch (critStage) {
      case 0:
        return 1 / 24;
      case 1:
        return 1 / 8;
      case 2:
        return 1 / 2;
      default:
        throw critRateError;
    }
  }
  throw new Error(
    "Gen 1 is currently not supported, or else you passed an invalid gen, oops!"
  );
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

export const filterMovesByVersionGroup = (
  moves: IMove[],
  versionGroup: string
) => {
  return moves
    .map((move) => {
      const foundMove = move.version_group_details.find(
        (detail) => detail.version_group.name === versionGroup
      );
      return foundMove && move;
    })
    .filter((move) => !!move) as IMove[];
};

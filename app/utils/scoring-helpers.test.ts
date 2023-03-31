import type { IMoveScores, ITeamTypeScores } from "~/interfaces";

import {
  fakeAbra,
  fakeAlakazam,
  fakeConfusion,
  fakeGothita,
  fakeHydroPump,
  fakePound,
} from "~/testing/world";
import {
  compileTeamValues,
  makeDelta,
  scoreSingleMove,
} from "./scoring-helpers";

test("compileValues works", () => {
  expect(
    compileTeamValues({
      abra: { values: { grass: -1, psychic: -1 } },
      kadabra: { values: { grass: -1, psychic: 1 } },
    })
  ).toEqual({ grass: -2, psychic: 0 });
});

test("makeDelta works", () => {
  const fakeTeamOffValues: ITeamTypeScores = {
    final: 4,
    raw: {
      abra: { values: { psychic: 1, water: 1, ground: -1 } },
      kadabra: { values: { psychic: 1, flying: 1, rock: 1 } },
    },
    processed: {},
  };
  const fakeTeamDefValues: ITeamTypeScores = {
    final: 4,
    raw: {
      abra: { values: { psychic: 1, water: 1, ground: -1 } },
      kadabra: { values: { psychic: 1, flying: 1, rock: 1 } },
    },
    processed: {},
  };
  const fakeMoveScores: IMoveScores = {
    0: {
      final: 3,
      moves: {
        teleport: { dmg: 1, score: 1 },
        pound: { dmg: 1, score: 1 },
        scratch: { dmg: 1, score: 1 },
      },
    },
    1: {
      final: 2,
      moves: { teleport: { dmg: 1, score: 1 }, psychic: { dmg: 1, score: 1 } },
    },
    2: {
      final: 5,
      moves: {
        teleport: { dmg: 1, score: 2 },
        psychic: { dmg: 1, score: 2 },
        slam: { dmg: 1, score: 1 },
      },
    },
  };
  const fakeStatScores: {
    [id: number]: number | undefined;
  } = { 0: 3, 1: 5, 2: 7 };

  const fakeScoringOffValues = {
    name: "alakazam",
    values: { psychic: 1, ground: 1, grass: 1, dark: 1 },
  };
  const fakeScoringDefValues = {
    name: "alakazam",
    values: { psychic: 1, ground: 1, grass: 1 },
  };

  expect(
    makeDelta({
      teamDefScores: fakeTeamDefValues,
      teamOffScores: fakeTeamOffValues,
      scoringPokeDefValues: fakeScoringDefValues,
      scoringPokeOffValues: fakeScoringOffValues,
      teamPokemon: fakeAbra,
      scoringPokemon: fakeAlakazam,
      moveScores: fakeMoveScores,
      statScores: fakeStatScores,
    })
  ).toBe(25 - 14);
});

test("scoreSingleMove works", () => {
  expect(
    scoreSingleMove({ pokemon: fakeGothita, move: fakePound, gen: 7 })
  ).toEqual({ dmg: 3.6, score: 3.6 });
  expect(
    scoreSingleMove({ pokemon: fakeGothita, move: fakeConfusion, gen: 7 })
  ).toEqual({ dmg: 8.2, score: 8.2 });
  // moves below a PP threshold lose points
  expect(
    scoreSingleMove({ pokemon: fakeGothita, move: fakeHydroPump, gen: 7 })
  ).toEqual({ dmg: 7.6, score: 6.1 });
});

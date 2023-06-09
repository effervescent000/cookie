import _ from "lodash";
import { DEF_SCORING_VALUES } from "~/constants/scoring-constants";
import { getTypes } from "~/constants/types-constants";

import type { IMoveScores, ITeamTypeScores } from "~/interfaces";

import {
  fakeAbraFull,
  fakeAbraSkeleton,
  fakeAgility,
  fakeAlakazamSkeleton,
  fakeAstonish,
  fakeConfusion,
  fakeGhostType,
  fakeGothita,
  fakeGrassType,
  fakeHydroPump,
  fakeIronHead,
  fakeMisdreavusFull,
  fakeMisdreavusSkeleton,
  fakePansage,
  fakePansageFull,
  fakePound,
  fakePsychicType,
  fakeRegisteel,
  fakeRegisteelSkeleton,
  fakeSimipourFull,
  fakeSteelType,
  fakeVineWhip,
  fakeWaterType,
} from "~/testing/world";
import PokeAPIService from "./pokeapi-service";
import {
  compileTeamValues,
  makeDefensiveValues,
  makeDelta,
  makeOffensiveValues,
  scoreSingleMove,
  scoreTeamMovesVsTarget,
  scoreValues,
} from "./scoring-helpers";

const fillOutValues = (values: { [type: string]: number }, gen: number) => {
  const completedValues = { ...values };
  _.difference(
    getTypes(gen).map(({ key }) => key),
    Object.keys(values)
  ).forEach((t) => (completedValues[t] = 1));
  return completedValues;
};

describe("compileTeamValues tests", () => {
  test("compileValues works", () => {
    expect(
      compileTeamValues({
        abra: { values: { grass: -1, psychic: -1 } },
        kadabra: { values: { grass: -1, psychic: 1 } },
      })
    ).toEqual({ grass: -2, psychic: 0 });
  });
});

test("makeDelta works", () => {
  const fakeTeamDefValues: ITeamTypeScores = {
    final: 4,
    raw: {
      abra: { values: { psychic: 1, water: 1, ground: -1 } },
      kadabra: { values: { psychic: 1, flying: 1, rock: 1 } },
    },
    processed: {},
  };
  const fakeTeamOffValues: ITeamTypeScores = {
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

  const fakeScoringDefValues = {
    name: "alakazam",
    values: { psychic: 1, ground: 1, grass: 1 },
  };
  const fakeScoringOffValues = {
    name: "alakazam",
    values: { psychic: 1, ground: 1, grass: 1 },
  };

  expect(
    makeDelta({
      teamDefScores: fakeTeamDefValues,
      scoringPokeDefValues: fakeScoringDefValues,
      teamOffScores: fakeTeamOffValues,
      scoringPokeOffValues: fakeScoringOffValues,
      teamPokemon: fakeAbraSkeleton,
      scoringPokemon: fakeAlakazamSkeleton,
      moveScores: fakeMoveScores,
      statScores: fakeStatScores,
    })
  ).toBe(10);
});

describe("test scoreSingleMove", () => {
  test("scoreSingleMove works", async () => {
    expect(
      await scoreSingleMove({ pokemon: fakeGothita, move: fakePound, gen: 7 })
    ).toEqual({ dmg: 3.6, score: 3.6 });
    expect(
      await scoreSingleMove({
        pokemon: fakeGothita,
        move: fakeConfusion,
        gen: 7,
      })
    ).toEqual({ dmg: 8.2, score: 8.2 });
  });

  test("deduct points from low PP moves", async () => {
    expect(
      await scoreSingleMove({
        pokemon: fakeGothita,
        move: fakeHydroPump,
        gen: 7,
      })
    ).toEqual({ dmg: 7.6, score: 6.1 });
  });

  it("handles a type modifiers/0 multipliers correctly", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fakeGhostType));
    const P = new PokeAPIService();
    expect(
      await scoreSingleMove({
        pokemon: fakeGothita,
        move: fakePound,
        gen: 2,
        target: fakeMisdreavusFull,
        P,
      })
    ).toEqual({ dmg: 0, score: 0 });
  });
});

describe("makeDefensiveValues works", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("compiles type values properly for modern games", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fakeGhostType));
    const P = new PokeAPIService();
    expect(
      await makeDefensiveValues({ pokemon: fakeMisdreavusFull, P, gen: 6 })
    ).toStrictEqual(
      fillOutValues(
        {
          ghost: 2,
          dark: 2,
          poison: 0.5,
          bug: 0.5,
          normal: 0,
          fighting: 0,
        },
        6
      )
    );
  });

  it("defensive scoring handles gen I", async () => {
    fetchMock.mockResponseOnce(JSON.stringify(fakeGhostType));
    const P = new PokeAPIService();
    expect(
      await makeDefensiveValues({ pokemon: fakeMisdreavusFull, P, gen: 1 })
    ).toStrictEqual(
      fillOutValues(
        {
          ghost: 2,
          poison: 0.5,
          bug: 0.5,
          normal: 0,
          fighting: 0,
        },
        1
      )
    );
  });

  // I'm considering gen II "intermediate" b/c
  // it falls under the scope of the gen 2-5 changes, which are labeled
  // as gen V by the API
  it("defensive scoring handles intermediate gens", async () => {
    const selectedGen = 2;
    fetchMock.mockResponseOnce(JSON.stringify(fakeSteelType));
    const P = new PokeAPIService();
    expect(
      await makeDefensiveValues({ pokemon: fakeRegisteel, P, gen: selectedGen })
    ).toStrictEqual(
      fillOutValues(
        {
          fighting: 2,
          ground: 2,
          fire: 2,
          normal: 0.5,
          flying: 0.5,
          rock: 0.5,
          bug: 0.5,
          steel: 0.5,
          grass: 0.5,
          psychic: 0.5,
          ice: 0.5,
          dragon: 0.5,
          ghost: 0.5,
          dark: 0.5,
          poison: 0,
        },
        selectedGen
      )
    );
  });
});

describe("makeOffensiveValues works", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("compiles type-matchups correctly for modern games", async () => {
    const selectedGen = 6;
    fetchMock.mockIf(/v2\/\w+\//, (req) => {
      if (req.url.includes("move")) {
        return JSON.stringify(fakeAstonish);
      }
      return JSON.stringify(fakeGhostType);
    });
    const P = new PokeAPIService();
    expect(
      await makeOffensiveValues({
        pokemon: fakeMisdreavusSkeleton,
        P,
        gen: selectedGen,
      })
    ).toStrictEqual(
      fillOutValues(
        {
          ghost: 2,
          psychic: 2,
          dark: 0.5,
          normal: 0,
        },
        selectedGen
      )
    );
  });

  it("offensive scoring handles gen I", async () => {
    const selectedGen = 1;
    fetchMock.mockIf(/v2\/\w+\//, (req) => {
      if (req.url.includes("move")) {
        return JSON.stringify(fakeAstonish);
      }
      return JSON.stringify(fakeGhostType);
    });
    const P = new PokeAPIService();
    expect(
      await makeOffensiveValues({
        pokemon: fakeMisdreavusSkeleton,
        P,
        gen: selectedGen,
      })
    ).toStrictEqual(
      fillOutValues(
        {
          ghost: 2,
          normal: 0,
          psychic: 0,
        },
        selectedGen
      )
    );
  });

  it("offensive scoring handles intermediate gens", async () => {
    const selectedGen = 2;
    fetchMock.mockIf(/v2\/\w+\//, (req) => {
      if (req.url.includes("move")) {
        return JSON.stringify(fakeIronHead);
      }
      return JSON.stringify(fakeSteelType);
    });
    const P = new PokeAPIService();
    expect(
      await makeOffensiveValues({
        pokemon: fakeRegisteelSkeleton,
        P,
        gen: selectedGen,
      })
    ).toStrictEqual(
      fillOutValues(
        {
          rock: 2,
          ice: 2,
          steel: 0.5,
          fire: 0.5,
          water: 0.5,
          electric: 0.5,
        },
        selectedGen
      )
    );
  });
});

describe("test scoreTeamMovesVsTarget", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  it("lowers score for attackers that are vulnerable to their target", async () => {
    fetchMock.mockIf(/v2\/\w+\//, (req) => {
      if (req.url.includes("pokemon")) {
        return JSON.stringify(fakeAbraFull);
      }
      if (req.url.includes("move")) {
        return JSON.stringify(fakeConfusion);
      }
      if (req.url.includes("type")) {
        if (req.url.includes("psychic")) return JSON.stringify(fakePsychicType);
        if (req.url.includes("ghost")) return JSON.stringify(fakeGhostType);
      }
      return "";
    });
    const P = new PokeAPIService();
    expect(
      await scoreTeamMovesVsTarget({
        team: [fakeAbraSkeleton],
        targetFull: fakeMisdreavusFull,
        P,
        gen: 7,
        versionGroup: "sword-shield",
      })
    ).toEqual([
      {
        pokemon: fakeAbraSkeleton,
        move: "confusion",
        score: 5.6,
      },
    ]);
  });

  it("raises score if attacker is less vulnerable", async () => {
    fetchMock.mockIf(/v2\/\w+\//, (req) => {
      if (req.url.includes("pokemon")) {
        return JSON.stringify(fakePansageFull);
      }
      if (req.url.includes("move")) {
        return JSON.stringify(fakeVineWhip);
      }
      if (req.url.includes("type")) {
        if (req.url.includes("grass")) return JSON.stringify(fakeGrassType);
        if (req.url.includes("water")) return JSON.stringify(fakeWaterType);
      }
      return "";
    });
    const P = new PokeAPIService();
    expect(
      await scoreTeamMovesVsTarget({
        team: [fakePansage],
        targetFull: fakeSimipourFull,
        P,
        gen: 7,
        versionGroup: "sword-shield",
      })
    ).toEqual([
      {
        pokemon: fakePansage,
        move: "vine-whip",
        score: 24,
      },
    ]);
  });

  it("works with target moves", async () => {
    fetchMock.mockIf(/v2\/\w+\//, (req) => {
      if (req.url.includes("pokemon")) {
        return JSON.stringify(fakeAbraFull);
      }
      if (req.url.includes("move")) {
        return JSON.stringify(fakeConfusion);
      }
      if (req.url.includes("type")) {
        if (req.url.includes("psychic")) return JSON.stringify(fakePsychicType);
        if (req.url.includes("ghost")) return JSON.stringify(fakeGhostType);
      }
      return "";
    });
    const P = new PokeAPIService();
    expect(
      await scoreTeamMovesVsTarget({
        team: [fakeAbraSkeleton],
        targetFull: fakeMisdreavusFull,
        targetMoves: { astonish: fakeAstonish },
        P,
        gen: 7,
        versionGroup: "sword-shield",
      })
    ).toEqual([
      {
        pokemon: fakeAbraSkeleton,
        move: "confusion",
        score: 1.5,
      },
    ]);
  });
  it("decreases the static typing vuln modifier the more moves are known", async () => {
    // for this, we are going to pass in a single known move that doesn't do damage.
    // the output of this should NEVER be lower than the result with no known moves.
    fetchMock.mockIf(/v2\/\w+\//, (req) => {
      if (req.url.includes("pokemon")) {
        return JSON.stringify(fakeAbraFull);
      }
      if (req.url.includes("move")) {
        return JSON.stringify(fakeConfusion);
      }
      if (req.url.includes("type")) {
        if (req.url.includes("psychic")) return JSON.stringify(fakePsychicType);
        if (req.url.includes("ghost")) return JSON.stringify(fakeGhostType);
      }
      return "";
    });
    const P = new PokeAPIService();
    const resultWithNoMoves = await scoreTeamMovesVsTarget({
      team: [fakeAbraSkeleton],
      targetFull: fakeMisdreavusFull,
      P,
      gen: 7,
      versionGroup: "sword-shield",
    });
    const resultWithNonDamagingMove = await scoreTeamMovesVsTarget({
      team: [fakeAbraSkeleton],
      targetFull: fakeMisdreavusFull,
      targetMoves: { agility: fakeAgility },
      P,
      gen: 7,
      versionGroup: "sword-shield",
    });
    expect(resultWithNoMoves[0].score).toBeLessThan(
      resultWithNonDamagingMove[0].score
    );
  });
});

describe("scoreValues scores values", () => {
  it("bumps low values up", () => {
    const values = { bug: 0.5, psychic: 0.5, water: 2 };
    const scores = DEF_SCORING_VALUES;
    expect(scoreValues({ values, scores })).toEqual({
      bug: 1,
      psychic: 1,
      water: -1,
      final: 4,
    });
  });
  it("does not bump high values", () => {
    const values = {
      bug: 0.25,
      psychic: 0.25,
      water: 0.25,
      ice: 0.25,
      dragon: 0.25,
      fighting: 0.25,
      normal: 0.25,
    };
    const scores = DEF_SCORING_VALUES;
    expect(scoreValues({ values, scores })).toEqual({
      bug: 1.5,
      psychic: 1.5,
      water: 1.5,
      ice: 1.5,
      dragon: 1.5,
      fighting: 1.5,
      normal: 1.5,
      final: 10.5,
    });
  });
});

import _ from "lodash";
import { getTypes } from "~/constants/types-constants";

import type { IMoveScores, ITeamTypeScores } from "~/interfaces";

import {
  fakeAbraFull,
  fakeAbraSkeleton,
  fakeAlakazamSkeleton,
  fakeConfusion,
  fakeGhostType,
  fakeGothita,
  fakeGrassType,
  fakeHydroPump,
  fakeIronHead,
  fakeMisdreavusFull,
  fakeMisdreavusSkeleton,
  fakeNightShade,
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
} from "./scoring-helpers";

const fillOutValues = (values: { [type: string]: number }, gen: number) => {
  const completedValues = { ...values };
  _.difference(
    getTypes(gen).map(({ key }) => key),
    Object.keys(values)
  ).forEach((t) => (completedValues[t] = 1));
  return completedValues;
};

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
      teamPokemon: fakeAbraSkeleton,
      scoringPokemon: fakeAlakazamSkeleton,
      moveScores: fakeMoveScores,
      statScores: fakeStatScores,
    })
  ).toBe(25 - 14);
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
        return JSON.stringify(fakeNightShade);
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
        return JSON.stringify(fakeNightShade);
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
        target: fakeMisdreavusFull,
        P,
        gen: 7,
        versionGroup: "sword-shield",
      })
    ).toEqual([
      {
        pokemon: fakeAbraSkeleton,
        scores: [{ name: "confusion", score: 5.6 }],
      },
    ]);
  });

  it("raises score slightly if attacker is less vulnerable", async () => {
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
        target: fakeSimipourFull,
        P,
        gen: 7,
        versionGroup: "sword-shield",
      })
    ).toEqual([
      {
        pokemon: fakePansage,
        scores: [{ name: "vine-whip", score: 24.0 }],
      },
    ]);
  });
});

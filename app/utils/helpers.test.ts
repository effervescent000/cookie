import {
  fakeConfusion,
  fakeGhostType,
  fakeGothita,
  fakeGrassType,
  fakeMisdreavusFull,
  fakePansageFull,
  fakePound,
  fakePsychicType,
  fakeVineWhip,
} from "~/testing/world";
import {
  calcCritRate,
  calcDamage,
  diminishReturns,
  roundToPrecision,
  scoreTotalStats,
} from "./helpers";
import PokeAPIService from "./pokeapi-service";

test("roundToPrecision works", () => {
  expect(roundToPrecision(3.611111, 1)).toBe(3.6);
  expect(roundToPrecision(3.611111, 2)).toBe(3.61);
});

describe("calcDamage tests", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  const P = new PokeAPIService();
  it("calculates damage correctly", async () => {
    expect(
      roundToPrecision(
        await calcDamage({ pokemon: fakeGothita, move: fakePound, gen: 7 }),
        2
      )
    ).toBe(3.58);
    expect(
      roundToPrecision(
        await calcDamage({ pokemon: fakeGothita, move: fakeConfusion, gen: 7 }),
        2
      )
    ).toBe(8.2);
  });

  it("calculates damage with a target pokemon", async () => {
    fetchMock.mockResponse(JSON.stringify(fakePsychicType));
    expect(
      roundToPrecision(
        await calcDamage({
          pokemon: fakeGothita,
          move: fakeConfusion,
          gen: 7,
          target: fakeGothita,
          P,
        }),
        2
      )
    ).toBe(4.29);
  });

  it("handles damage x0 multipliers correctly", async () => {
    fetchMock.mockResponse(JSON.stringify(fakeGhostType));
    expect(
      await calcDamage({
        pokemon: fakeGothita,
        move: fakePound,
        gen: 2,
        target: fakeMisdreavusFull,
        P,
      })
    ).toBe(0);
  });

  it("handles STAB", async () => {
    fetchMock.mockResponse(JSON.stringify(fakeGrassType));
    expect(
      roundToPrecision(
        await calcDamage({
          pokemon: fakePansageFull,
          move: fakeVineWhip,
          gen: 7,
          P,
        }),
        1
      )
    ).toBe(7.5);
  });
});

test("diminishReturns works", () => {
  expect(diminishReturns(1)).toBe(1);
  expect(diminishReturns(-1)).toBe(-1);
  expect(diminishReturns(4)).toBe(4);
  expect(diminishReturns(-3)).toBe(-3);
  expect(roundToPrecision(diminishReturns(5), 1)).toBe(4.5);
  expect(Math.round(diminishReturns(-4) * 10) / 10).toBe(-4.3);
});

test("calcCritRate works", () => {
  expect(calcCritRate({ critStage: 0, gen: 2 })).toBe(17 / 256);
  expect(calcCritRate({ critStage: 1, gen: 3 })).toBe(1 / 8);
  expect(calcCritRate({ critStage: 1, gen: 7 })).toBe(1 / 8);
  expect(calcCritRate({ critStage: 0, gen: 7 })).toBe(1 / 24);
});

describe("test scoreTotalStats", () => {
  it("works!", () => {
    expect(scoreTotalStats(fakeGothita)).toBe(-0.3);
  });
});

import {
  fakeConfusion,
  fakeGhostType,
  fakeGothita,
  fakeMisdreavus,
  fakePound,
  fakePsychicType,
} from "~/testing/world";
import {
  calcCritRate,
  calcDamage,
  diminishReturns,
  roundToPrecision,
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

  it("handles damage modifiers correctly", async () => {
    fetchMock.mockResponse(JSON.stringify(fakeGhostType));
    expect(
      await calcDamage({
        pokemon: fakeGothita,
        move: fakePound,
        gen: 2,
        target: fakeMisdreavus,
        P,
      })
    ).toBe(0);
  });
});

test("diminishReturns works", () => {
  expect(diminishReturns(1)).toBe(1);
  expect(diminishReturns(-1)).toBe(-1);
  expect(diminishReturns(3)).toBe(3);
  expect(diminishReturns(-3)).toBe(-3);
  expect(Math.round(diminishReturns(4) * 10) / 10).toBe(3.6);
  expect(Math.round(diminishReturns(-4) * 10) / 10).toBe(-4.3);
});

test("calcCritRate works", () => {
  expect(calcCritRate({ critStage: 0, gen: 2 })).toBe(17 / 256);
  expect(calcCritRate({ critStage: 1, gen: 3 })).toBe(1 / 8);
  expect(calcCritRate({ critStage: 1, gen: 7 })).toBe(1 / 8);
  expect(calcCritRate({ critStage: 0, gen: 7 })).toBe(1 / 24);
});

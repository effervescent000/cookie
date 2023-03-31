import { fakeConfusion, fakeGothita, fakePound } from "~/testing/world";
import {
  calcCritRate,
  calcDamage,
  diminishReturns,
  roundToPrecision,
} from "./helpers";

test("roundToPrecision works", () => {
  expect(roundToPrecision(3.611111, 1)).toBe(3.6);
  expect(roundToPrecision(3.611111, 2)).toBe(3.61);
});

test("calcDamage works", () => {
  expect(
    roundToPrecision(
      calcDamage({ pokemon: fakeGothita, move: fakePound, gen: 7 }),
      2
    )
  ).toBe(3.58);
  expect(
    roundToPrecision(
      calcDamage({ pokemon: fakeGothita, move: fakeConfusion, gen: 7 }),
      2
    )
  ).toBe(8.2);
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

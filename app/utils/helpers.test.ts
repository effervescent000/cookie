import type {
  IMoveResponse,
  IMoveScores,
  IPokemonFull,
  ITeamTypeScores,
} from "~/interfaces";

import {
  calcDamage,
  compileTeamValues,
  diminishReturns,
  makeDelta,
  roundToPrecision,
} from "./helpers";

const fakeGothita = {
  stats: [
    {
      base_stat: 30,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "psychic",
        url: "https://pokeapi.co/api/v2/type/14/",
      },
    },
  ],
} as IPokemonFull;

const fakePound = {
  accuracy: 100,
  damage_class: {
    name: "physical",
    url: "https://pokeapi.co/api/v2/move-damage-class/2/",
  },
  meta: null,
  name: "pound",
  past_values: [],
  power: 40,
  pp: 35,
  priority: 0,
  stat_changes: [],
  type: {
    name: "normal",
    url: "https://pokeapi.co/api/v2/type/1/",
  },
} as IMoveResponse;

const fakeConfusion = {
  accuracy: 100,
  damage_class: {
    name: "special",
    url: "https://pokeapi.co/api/v2/move-damage-class/3/",
  },
  effect_chance: 10,
  effect_changes: [],
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 93,
  machines: [],
  meta: {
    ailment: {
      name: "confusion",
      url: "https://pokeapi.co/api/v2/move-ailment/6/",
    },
    ailment_chance: 10,
    category: {
      name: "damage+ailment",
      url: "https://pokeapi.co/api/v2/move-category/4/",
    },
    crit_rate: 0,
    drain: 0,
    flinch_chance: 0,
    healing: 0,
    max_hits: null,
    max_turns: 5,
    min_hits: null,
    min_turns: 2,
    stat_chance: 0,
  },
  name: "confusion",
  past_values: [],
  power: 50,
  pp: 25,
  priority: 0,
  stat_changes: [],
  type: {
    name: "psychic",
    url: "https://pokeapi.co/api/v2/type/14/",
  },
};

const fakeAbra = {
  id: 0,
  name: "abra",
  moves: { 1: "", 2: "", 3: "", 4: "" },
};

const fakeKadabra = {
  id: 1,
  name: "kadabra",
  moves: { 1: "", 2: "", 3: "", 4: "" },
};

const fakeAlakazam = {
  id: 2,
  name: "alakazam",
  moves: { 1: "", 2: "", 3: "", 4: "" },
};

test("calcDamage works", () => {
  expect(calcDamage({ pokemon: fakeGothita, move: fakePound })).toBe(3.6875);
  expect(calcDamage({ pokemon: fakeGothita, move: fakeConfusion })).toBe(
    8.437499999999998
  );
});

test("compileValues works", () => {
  expect(
    compileTeamValues({
      abra: { values: { grass: -1, psychic: -1 } },
      kadabra: { values: { grass: -1, psychic: 1 } },
    })
  ).toEqual({ grass: -2, psychic: 0 });
});

test("diminishReturns works", () => {
  expect(diminishReturns(1)).toBe(1);
  expect(diminishReturns(-1)).toBe(-1);
  expect(diminishReturns(3)).toBe(3);
  expect(diminishReturns(-3)).toBe(-3);
  expect(Math.round(diminishReturns(4) * 10) / 10).toBe(3.6);
  expect(Math.round(diminishReturns(-4) * 10) / 10).toBe(-4.3);
});

test("roundToPrecision works", () => {
  expect(roundToPrecision(3.611111, 1)).toBe(3.6);
  expect(roundToPrecision(3.611111, 2)).toBe(3.61);
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
    0: { final: 3, teleport: 1, pound: 1, scratch: 1 },
    1: { final: 2, teleport: 1, psychic: 1 },
    2: { final: 5, teleport: 2, psychic: 2, slam: 1 },
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

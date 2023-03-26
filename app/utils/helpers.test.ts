import type { IMoveResponse, IPokemonFull } from "~/interfaces";

import { calcDamage } from "./helpers";

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

test("calcDamage works", () => {
  expect(calcDamage({ pokemon: fakeGothita, move: fakePound })).toBe(3.6875);
  expect(calcDamage({ pokemon: fakeGothita, move: fakeConfusion })).toBe(
    8.437499999999998
  );
});

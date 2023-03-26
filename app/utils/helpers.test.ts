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
  ],
} as IPokemonFull;

const fakePound = {
  accuracy: 100,
  damage_class: {
    name: "physical",
    url: "https://pokeapi.co/api/v2/move-damage-class/2/",
  },
  effect_chance: null,
  effect_changes: [],
  effect_entries: [],
  flavor_text_entries: [],
  machines: [],
  meta: null,
  name: "pound",
  past_values: [],
  power: 40,
  pp: 35,
  priority: 0,
  stat_changes: [],
  target: {
    name: "selected-pokemon",
    url: "https://pokeapi.co/api/v2/move-target/10/",
  },
  type: {
    name: "normal",
    url: "https://pokeapi.co/api/v2/type/1/",
  },
} as IMoveResponse;

test("calcDamage works", () => {
  expect(calcDamage({ pokemon: fakeGothita, move: fakePound })).toBe(3.6875);
});

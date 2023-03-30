import type { IMoveResponse, IPokemonFull } from "~/interfaces";

// *******************************
// FULL POKEMON
// *******************************

export const fakeGothita = {
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

// *******************************
// POKEMON SKELETONS
// *******************************

export const fakeAbra = {
  id: 0,
  name: "abra",
  moves: { 1: "", 2: "", 3: "", 4: "" },
};

// const fakeKadabra = {
//   id: 1,
//   name: "kadabra",
//   moves: { 1: "", 2: "", 3: "", 4: "" },
// };

export const fakeAlakazam = {
  id: 2,
  name: "alakazam",
  moves: { 1: "", 2: "", 3: "", 4: "" },
};

// *******************************
// MOVES
// *******************************

export const fakePound = {
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

export const fakeConfusion = {
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

export const fakeHydroPump = {
  accuracy: 80,
  damage_class: {
    name: "special",
    url: "https://pokeapi.co/api/v2/move-damage-class/3/",
  },
  effect_chance: null,
  effect_changes: [],
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 56,
  machines: [
    {
      machine: {
        url: "https://pokeapi.co/api/v2/machine/1528/",
      },
      version_group: {
        name: "sword-shield",
        url: "https://pokeapi.co/api/v2/version-group/20/",
      },
    },
  ],
  meta: {
    ailment: {
      name: "none",
      url: "https://pokeapi.co/api/v2/move-ailment/0/",
    },
    ailment_chance: 0,
    category: {
      name: "damage",
      url: "https://pokeapi.co/api/v2/move-category/0/",
    },
    crit_rate: 0,
    drain: 0,
    flinch_chance: 0,
    healing: 0,
    max_hits: null,
    max_turns: null,
    min_hits: null,
    min_turns: null,
    stat_chance: 0,
  },
  name: "hydro-pump",
  past_values: [
    {
      accuracy: null,
      effect_chance: null,
      effect_entries: [],
      power: 120,
      pp: null,
      type: null,
      version_group: {
        name: "x-y",
        url: "https://pokeapi.co/api/v2/version-group/15/",
      },
    },
  ],
  power: 110,
  pp: 5,
  priority: 0,
  stat_changes: [],
  type: {
    name: "water",
    url: "https://pokeapi.co/api/v2/type/11/",
  },
} as IMoveResponse;

import type { IMoveResponse, IPokemonFull } from "~/interfaces";

// *******************************
// FULL POKEMON
// *******************************

export const fakeGothita = {
  stats: [
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 30,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 50,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
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
    {
      base_stat: 65,
      effort: 1,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 45,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
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

export const fakeMisdreavus = {
  id: 200,
  name: "misdreavus",
  past_types: [],
  species: {
    name: "misdreavus",
    url: "https://pokeapi.co/api/v2/pokemon-species/200/",
  },
  stats: [
    {
      base_stat: 60,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 60,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 60,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
    },
    {
      base_stat: 85,
      effort: 0,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 85,
      effort: 1,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 85,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "ghost",
        url: "https://pokeapi.co/api/v2/type/8/",
      },
    },
  ],
} as unknown as IPokemonFull;

export const fakeAbraFull = {
  abilities: [
    {
      ability: {
        name: "synchronize",
        url: "https://pokeapi.co/api/v2/ability/28/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "inner-focus",
        url: "https://pokeapi.co/api/v2/ability/39/",
      },
      is_hidden: false,
      slot: 2,
    },
    {
      ability: {
        name: "magic-guard",
        url: "https://pokeapi.co/api/v2/ability/98/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  base_experience: 62,
  forms: [
    {
      name: "abra",
      url: "https://pokeapi.co/api/v2/pokemon-form/63/",
    },
  ],
  height: 9,
  id: 63,
  name: "abra",
  order: 103,
  past_types: [],
  species: {
    name: "abra",
    url: "https://pokeapi.co/api/v2/pokemon-species/63/",
  },
  stats: [
    {
      base_stat: 25,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 20,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 15,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
    },
    {
      base_stat: 105,
      effort: 1,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 55,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 90,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
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
  weight: 195,
};

export const fakeRegisteel: IPokemonFull = {
  forms: [
    {
      name: "registeel",
      url: "https://pokeapi.co/api/v2/pokemon-form/379/",
    },
  ],
  id: 379,
  name: "registeel",
  order: 502,
  past_types: [],
  species: {
    name: "registeel",
    url: "https://pokeapi.co/api/v2/pokemon-species/379/",
  },
  stats: [
    {
      base_stat: 80,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 75,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 150,
      effort: 2,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
    },
    {
      base_stat: 75,
      effort: 0,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 150,
      effort: 1,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 50,
      effort: 0,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "steel",
        url: "https://pokeapi.co/api/v2/type/9/",
      },
    },
  ],
} as unknown as IPokemonFull;

// *******************************
// POKEMON SKELETONS
// *******************************

export const fakeAbraSkeleton = {
  id: 0,
  name: "abra",
  moves: { 1: "", 2: "", 3: "", 4: "" },
};

// const fakeKadabra = {
//   id: 1,
//   name: "kadabra",
//   moves: { 1: "", 2: "", 3: "", 4: "" },
// };

export const fakeAlakazamSkeleton = {
  id: 2,
  name: "alakazam",
  moves: { 1: "", 2: "", 3: "", 4: "" },
};

export const fakeMisdreavusSkeleton = {
  id: 2,
  name: "misdreavus",
  moves: { 1: "night-shade", 2: "", 3: "", 4: "" },
};

export const fakeRegisteelSkeleton = {
  id: 2,
  name: "registeel",
  moves: { 1: "iron-head", 2: "", 3: "", 4: "" },
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

export const fakeNightShade = {
  accuracy: 100,
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
  id: 101,
  machines: [],
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
  name: "night-shade",
  past_values: [],
  power: null,
  pp: 15,
  priority: 0,
  stat_changes: [],
  type: {
    name: "ghost",
    url: "https://pokeapi.co/api/v2/type/8/",
  },
};

export const fakeIronHead = {
  accuracy: 100,
  damage_class: {
    name: "physical",
    url: "https://pokeapi.co/api/v2/move-damage-class/2/",
  },
  effect_chance: 30,
  effect_changes: [],
  generation: {
    name: "generation-iv",
    url: "https://pokeapi.co/api/v2/generation/4/",
  },
  id: 442,
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
    flinch_chance: 30,
    healing: 0,
    max_hits: null,
    max_turns: null,
    min_hits: null,
    min_turns: null,
    stat_chance: 0,
  },
  name: "iron-head",
  past_values: [],
  power: 80,
  pp: 15,
  priority: 0,
  stat_changes: [],
  target: {
    name: "selected-pokemon",
    url: "https://pokeapi.co/api/v2/move-target/10/",
  },
  type: {
    name: "steel",
    url: "https://pokeapi.co/api/v2/type/9/",
  },
};

// *******************************
// TYPES
// *******************************

export const fakeGhostType = {
  damage_relations: {
    double_damage_from: [
      {
        name: "ghost",
        url: "https://pokeapi.co/api/v2/type/8/",
      },
      {
        name: "dark",
        url: "https://pokeapi.co/api/v2/type/17/",
      },
    ],
    double_damage_to: [
      {
        name: "ghost",
        url: "https://pokeapi.co/api/v2/type/8/",
      },
      {
        name: "psychic",
        url: "https://pokeapi.co/api/v2/type/14/",
      },
    ],
    half_damage_from: [
      {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
      {
        name: "bug",
        url: "https://pokeapi.co/api/v2/type/7/",
      },
    ],
    half_damage_to: [
      {
        name: "dark",
        url: "https://pokeapi.co/api/v2/type/17/",
      },
    ],
    no_damage_from: [
      {
        name: "normal",
        url: "https://pokeapi.co/api/v2/type/1/",
      },
      {
        name: "fighting",
        url: "https://pokeapi.co/api/v2/type/2/",
      },
    ],
    no_damage_to: [
      {
        name: "normal",
        url: "https://pokeapi.co/api/v2/type/1/",
      },
    ],
  },
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 8,
  name: "ghost",
  past_damage_relations: [
    {
      damage_relations: {
        double_damage_from: [
          {
            name: "ghost",
            url: "https://pokeapi.co/api/v2/type/8/",
          },
        ],
        double_damage_to: [
          {
            name: "ghost",
            url: "https://pokeapi.co/api/v2/type/8/",
          },
        ],
        half_damage_from: [
          {
            name: "poison",
            url: "https://pokeapi.co/api/v2/type/4/",
          },
          {
            name: "bug",
            url: "https://pokeapi.co/api/v2/type/7/",
          },
        ],
        half_damage_to: [],
        no_damage_from: [
          {
            name: "normal",
            url: "https://pokeapi.co/api/v2/type/1/",
          },
          {
            name: "fighting",
            url: "https://pokeapi.co/api/v2/type/2/",
          },
        ],
        no_damage_to: [
          {
            name: "normal",
            url: "https://pokeapi.co/api/v2/type/1/",
          },
          {
            name: "psychic",
            url: "https://pokeapi.co/api/v2/type/14/",
          },
        ],
      },
      generation: {
        name: "generation-i",
        url: "https://pokeapi.co/api/v2/generation/1/",
      },
    },
    {
      damage_relations: {
        double_damage_from: [
          {
            name: "ghost",
            url: "https://pokeapi.co/api/v2/type/8/",
          },
          {
            name: "dark",
            url: "https://pokeapi.co/api/v2/type/17/",
          },
        ],
        double_damage_to: [
          {
            name: "ghost",
            url: "https://pokeapi.co/api/v2/type/8/",
          },
          {
            name: "psychic",
            url: "https://pokeapi.co/api/v2/type/14/",
          },
        ],
        half_damage_from: [
          {
            name: "poison",
            url: "https://pokeapi.co/api/v2/type/4/",
          },
          {
            name: "bug",
            url: "https://pokeapi.co/api/v2/type/7/",
          },
        ],
        half_damage_to: [
          {
            name: "dark",
            url: "https://pokeapi.co/api/v2/type/17/",
          },
          {
            name: "steel",
            url: "https://pokeapi.co/api/v2/type/9/",
          },
        ],
        no_damage_from: [
          {
            name: "normal",
            url: "https://pokeapi.co/api/v2/type/1/",
          },
          {
            name: "fighting",
            url: "https://pokeapi.co/api/v2/type/2/",
          },
        ],
        no_damage_to: [
          {
            name: "normal",
            url: "https://pokeapi.co/api/v2/type/1/",
          },
        ],
      },
      generation: {
        name: "generation-v",
        url: "https://pokeapi.co/api/v2/generation/5/",
      },
    },
  ],
};

export const fakeSteelType = {
  damage_relations: {
    double_damage_from: [
      {
        name: "fighting",
        url: "https://pokeapi.co/api/v2/type/2/",
      },
      {
        name: "ground",
        url: "https://pokeapi.co/api/v2/type/5/",
      },
      {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
    ],
    double_damage_to: [
      {
        name: "rock",
        url: "https://pokeapi.co/api/v2/type/6/",
      },
      {
        name: "ice",
        url: "https://pokeapi.co/api/v2/type/15/",
      },
      {
        name: "fairy",
        url: "https://pokeapi.co/api/v2/type/18/",
      },
    ],
    half_damage_from: [
      {
        name: "normal",
        url: "https://pokeapi.co/api/v2/type/1/",
      },
      {
        name: "flying",
        url: "https://pokeapi.co/api/v2/type/3/",
      },
      {
        name: "rock",
        url: "https://pokeapi.co/api/v2/type/6/",
      },
      {
        name: "bug",
        url: "https://pokeapi.co/api/v2/type/7/",
      },
      {
        name: "steel",
        url: "https://pokeapi.co/api/v2/type/9/",
      },
      {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
      {
        name: "psychic",
        url: "https://pokeapi.co/api/v2/type/14/",
      },
      {
        name: "ice",
        url: "https://pokeapi.co/api/v2/type/15/",
      },
      {
        name: "dragon",
        url: "https://pokeapi.co/api/v2/type/16/",
      },
      {
        name: "fairy",
        url: "https://pokeapi.co/api/v2/type/18/",
      },
    ],
    half_damage_to: [
      {
        name: "steel",
        url: "https://pokeapi.co/api/v2/type/9/",
      },
      {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
      {
        name: "water",
        url: "https://pokeapi.co/api/v2/type/11/",
      },
      {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
    ],
    no_damage_from: [
      {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    ],
    no_damage_to: [],
  },
  generation: {
    name: "generation-ii",
    url: "https://pokeapi.co/api/v2/generation/2/",
  },
  id: 9,
  move_damage_class: {
    name: "physical",
    url: "https://pokeapi.co/api/v2/move-damage-class/2/",
  },
  name: "steel",
  past_damage_relations: [
    {
      damage_relations: {
        double_damage_from: [
          {
            name: "fighting",
            url: "https://pokeapi.co/api/v2/type/2/",
          },
          {
            name: "ground",
            url: "https://pokeapi.co/api/v2/type/5/",
          },
          {
            name: "fire",
            url: "https://pokeapi.co/api/v2/type/10/",
          },
        ],
        double_damage_to: [
          {
            name: "rock",
            url: "https://pokeapi.co/api/v2/type/6/",
          },
          {
            name: "ice",
            url: "https://pokeapi.co/api/v2/type/15/",
          },
        ],
        half_damage_from: [
          {
            name: "normal",
            url: "https://pokeapi.co/api/v2/type/1/",
          },
          {
            name: "flying",
            url: "https://pokeapi.co/api/v2/type/3/",
          },
          {
            name: "rock",
            url: "https://pokeapi.co/api/v2/type/6/",
          },
          {
            name: "bug",
            url: "https://pokeapi.co/api/v2/type/7/",
          },
          {
            name: "steel",
            url: "https://pokeapi.co/api/v2/type/9/",
          },
          {
            name: "grass",
            url: "https://pokeapi.co/api/v2/type/12/",
          },
          {
            name: "psychic",
            url: "https://pokeapi.co/api/v2/type/14/",
          },
          {
            name: "ice",
            url: "https://pokeapi.co/api/v2/type/15/",
          },
          {
            name: "dragon",
            url: "https://pokeapi.co/api/v2/type/16/",
          },
          {
            name: "ghost",
            url: "https://pokeapi.co/api/v2/type/8/",
          },
          {
            name: "dark",
            url: "https://pokeapi.co/api/v2/type/17/",
          },
        ],
        half_damage_to: [
          {
            name: "steel",
            url: "https://pokeapi.co/api/v2/type/9/",
          },
          {
            name: "fire",
            url: "https://pokeapi.co/api/v2/type/10/",
          },
          {
            name: "water",
            url: "https://pokeapi.co/api/v2/type/11/",
          },
          {
            name: "electric",
            url: "https://pokeapi.co/api/v2/type/13/",
          },
        ],
        no_damage_from: [
          {
            name: "poison",
            url: "https://pokeapi.co/api/v2/type/4/",
          },
        ],
        no_damage_to: [],
      },
      generation: {
        name: "generation-v",
        url: "https://pokeapi.co/api/v2/generation/5/",
      },
    },
  ],
};

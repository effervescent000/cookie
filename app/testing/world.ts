import type { IMoveResponse, IPokemonFull } from "~/interfaces";

// *******************************
// FULL POKEMON
// *******************************

export const fakeGothita = {
  abilities: [
    {
      ability: {
        name: "frisk",
        url: "https://pokeapi.co/api/v2/ability/119/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "competitive",
        url: "https://pokeapi.co/api/v2/ability/172/",
      },
      is_hidden: false,
      slot: 2,
    },
    {
      ability: {
        name: "shadow-tag",
        url: "https://pokeapi.co/api/v2/ability/23/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  base_experience: 58,
  forms: [
    {
      name: "gothita",
      url: "https://pokeapi.co/api/v2/pokemon-form/574/",
    },
  ],
  height: 4,
  id: 574,
  is_default: true,
  location_area_encounters: "https://pokeapi.co/api/v2/pokemon/574/encounters",
  name: "gothita",
  order: 696,
  past_types: [],
  species: {
    name: "gothita",
    url: "https://pokeapi.co/api/v2/pokemon-species/574/",
  },
  sprites: {
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/574.png",
    back_female: null,
    back_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/574.png",
    back_shiny_female: null,
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/574.png",
    front_female: null,
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/574.png",
    front_shiny_female: null,
    other: {
      dream_world: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/574.svg",
        front_female: null,
      },
      home: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/574.png",
        front_female: null,
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/574.png",
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/574.png",
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/574.png",
      },
    },
  },
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
  weight: 58,
} as unknown as IPokemonFull;

export const fakeMisdreavusFull = {
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
  moves: [
    {
      move: {
        name: "body-slam",
        url: "https://pokeapi.co/api/v2/move/34/",
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "red-blue",
            url: "https://pokeapi.co/api/v2/version-group/1/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "yellow",
            url: "https://pokeapi.co/api/v2/version-group/2/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "tutor",
            url: "https://pokeapi.co/api/v2/move-learn-method/3/",
          },
          version_group: {
            name: "emerald",
            url: "https://pokeapi.co/api/v2/version-group/6/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "tutor",
            url: "https://pokeapi.co/api/v2/move-learn-method/3/",
          },
          version_group: {
            name: "firered-leafgreen",
            url: "https://pokeapi.co/api/v2/version-group/7/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "tutor",
            url: "https://pokeapi.co/api/v2/move-learn-method/3/",
          },
          version_group: {
            name: "xd",
            url: "https://pokeapi.co/api/v2/version-group/13/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "sword-shield",
            url: "https://pokeapi.co/api/v2/version-group/20/",
          },
        },
      ],
    },
    {
      move: {
        name: "take-down",
        url: "https://pokeapi.co/api/v2/move/36/",
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "red-blue",
            url: "https://pokeapi.co/api/v2/version-group/1/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "yellow",
            url: "https://pokeapi.co/api/v2/version-group/2/",
          },
        },
      ],
    },
    {
      move: {
        name: "seismic-toss",
        url: "https://pokeapi.co/api/v2/move/69/",
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "red-blue",
            url: "https://pokeapi.co/api/v2/version-group/1/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "yellow",
            url: "https://pokeapi.co/api/v2/version-group/2/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "tutor",
            url: "https://pokeapi.co/api/v2/move-learn-method/3/",
          },
          version_group: {
            name: "emerald",
            url: "https://pokeapi.co/api/v2/version-group/6/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "tutor",
            url: "https://pokeapi.co/api/v2/move-learn-method/3/",
          },
          version_group: {
            name: "firered-leafgreen",
            url: "https://pokeapi.co/api/v2/version-group/7/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "tutor",
            url: "https://pokeapi.co/api/v2/move-learn-method/3/",
          },
          version_group: {
            name: "xd",
            url: "https://pokeapi.co/api/v2/version-group/13/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "lets-go-pikachu-lets-go-eevee",
            url: "https://pokeapi.co/api/v2/version-group/19/",
          },
        },
      ],
    },
    {
      move: {
        name: "confusion",
        url: "https://pokeapi.co/api/v2/move/93/",
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "egg",
            url: "https://pokeapi.co/api/v2/move-learn-method/2/",
          },
          version_group: {
            name: "sword-shield",
            url: "https://pokeapi.co/api/v2/version-group/20/",
          },
        },
      ],
    },
    {
      move: {
        name: "teleport",
        url: "https://pokeapi.co/api/v2/move/100/",
      },
      version_group_details: [
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "red-blue",
            url: "https://pokeapi.co/api/v2/version-group/1/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "red-blue",
            url: "https://pokeapi.co/api/v2/version-group/1/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "yellow",
            url: "https://pokeapi.co/api/v2/version-group/2/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "yellow",
            url: "https://pokeapi.co/api/v2/version-group/2/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "gold-silver",
            url: "https://pokeapi.co/api/v2/version-group/3/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "crystal",
            url: "https://pokeapi.co/api/v2/version-group/4/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "ruby-sapphire",
            url: "https://pokeapi.co/api/v2/version-group/5/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "emerald",
            url: "https://pokeapi.co/api/v2/version-group/6/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "firered-leafgreen",
            url: "https://pokeapi.co/api/v2/version-group/7/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "diamond-pearl",
            url: "https://pokeapi.co/api/v2/version-group/8/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "platinum",
            url: "https://pokeapi.co/api/v2/version-group/9/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "heartgold-soulsilver",
            url: "https://pokeapi.co/api/v2/version-group/10/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "black-white",
            url: "https://pokeapi.co/api/v2/version-group/11/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "colosseum",
            url: "https://pokeapi.co/api/v2/version-group/12/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "xd",
            url: "https://pokeapi.co/api/v2/version-group/13/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "black-2-white-2",
            url: "https://pokeapi.co/api/v2/version-group/14/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "x-y",
            url: "https://pokeapi.co/api/v2/version-group/15/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "omega-ruby-alpha-sapphire",
            url: "https://pokeapi.co/api/v2/version-group/16/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "sun-moon",
            url: "https://pokeapi.co/api/v2/version-group/17/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "ultra-sun-ultra-moon",
            url: "https://pokeapi.co/api/v2/version-group/18/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "lets-go-pikachu-lets-go-eevee",
            url: "https://pokeapi.co/api/v2/version-group/19/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "lets-go-pikachu-lets-go-eevee",
            url: "https://pokeapi.co/api/v2/version-group/19/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "sword-shield",
            url: "https://pokeapi.co/api/v2/version-group/20/",
          },
        },
      ],
    },
    {
      move: {
        name: "swift",
        url: "https://pokeapi.co/api/v2/move/129/",
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "sword-shield",
            url: "https://pokeapi.co/api/v2/version-group/20/",
          },
        },
      ],
    },
    {
      move: {
        name: "shadow-ball",
        url: "https://pokeapi.co/api/v2/move/247/",
      },
      version_group_details: [
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "gold-silver",
            url: "https://pokeapi.co/api/v2/version-group/3/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "crystal",
            url: "https://pokeapi.co/api/v2/version-group/4/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "ruby-sapphire",
            url: "https://pokeapi.co/api/v2/version-group/5/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "emerald",
            url: "https://pokeapi.co/api/v2/version-group/6/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "firered-leafgreen",
            url: "https://pokeapi.co/api/v2/version-group/7/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "diamond-pearl",
            url: "https://pokeapi.co/api/v2/version-group/8/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "platinum",
            url: "https://pokeapi.co/api/v2/version-group/9/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "heartgold-soulsilver",
            url: "https://pokeapi.co/api/v2/version-group/10/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "black-white",
            url: "https://pokeapi.co/api/v2/version-group/11/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "colosseum",
            url: "https://pokeapi.co/api/v2/version-group/12/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "xd",
            url: "https://pokeapi.co/api/v2/version-group/13/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "black-2-white-2",
            url: "https://pokeapi.co/api/v2/version-group/14/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "x-y",
            url: "https://pokeapi.co/api/v2/version-group/15/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "omega-ruby-alpha-sapphire",
            url: "https://pokeapi.co/api/v2/version-group/16/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "sun-moon",
            url: "https://pokeapi.co/api/v2/version-group/17/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "ultra-sun-ultra-moon",
            url: "https://pokeapi.co/api/v2/version-group/18/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "lets-go-pikachu-lets-go-eevee",
            url: "https://pokeapi.co/api/v2/version-group/19/",
          },
        },
        {
          level_learned_at: 0,
          move_learn_method: {
            name: "machine",
            url: "https://pokeapi.co/api/v2/move-learn-method/4/",
          },
          version_group: {
            name: "sword-shield",
            url: "https://pokeapi.co/api/v2/version-group/20/",
          },
        },
      ],
    },
  ],
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
} as unknown as IPokemonFull;

export const fakeRegisteel = {
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

export const fakePansageFull = {
  abilities: [
    {
      ability: {
        name: "gluttony",
        url: "https://pokeapi.co/api/v2/ability/82/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "overgrow",
        url: "https://pokeapi.co/api/v2/ability/65/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  base_experience: 63,
  height: 6,
  id: 511,
  is_default: true,
  location_area_encounters: "https://pokeapi.co/api/v2/pokemon/511/encounters",
  moves: [
    {
      move: {
        name: "scratch",
        url: "https://pokeapi.co/api/v2/move/10/",
      },
      version_group_details: [
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "black-white",
            url: "https://pokeapi.co/api/v2/version-group/11/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "black-2-white-2",
            url: "https://pokeapi.co/api/v2/version-group/14/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "x-y",
            url: "https://pokeapi.co/api/v2/version-group/15/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "omega-ruby-alpha-sapphire",
            url: "https://pokeapi.co/api/v2/version-group/16/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "sun-moon",
            url: "https://pokeapi.co/api/v2/version-group/17/",
          },
        },
        {
          level_learned_at: 1,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "ultra-sun-ultra-moon",
            url: "https://pokeapi.co/api/v2/version-group/18/",
          },
        },
      ],
    },
    {
      move: {
        name: "vine-whip",
        url: "https://pokeapi.co/api/v2/move/22/",
      },
      version_group_details: [
        {
          level_learned_at: 10,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "black-white",
            url: "https://pokeapi.co/api/v2/version-group/11/",
          },
        },
        {
          level_learned_at: 10,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "black-2-white-2",
            url: "https://pokeapi.co/api/v2/version-group/14/",
          },
        },
        {
          level_learned_at: 10,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "x-y",
            url: "https://pokeapi.co/api/v2/version-group/15/",
          },
        },
        {
          level_learned_at: 10,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "omega-ruby-alpha-sapphire",
            url: "https://pokeapi.co/api/v2/version-group/16/",
          },
        },
        {
          level_learned_at: 10,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "sun-moon",
            url: "https://pokeapi.co/api/v2/version-group/17/",
          },
        },
        {
          level_learned_at: 10,
          move_learn_method: {
            name: "level-up",
            url: "https://pokeapi.co/api/v2/move-learn-method/1/",
          },
          version_group: {
            name: "ultra-sun-ultra-moon",
            url: "https://pokeapi.co/api/v2/version-group/18/",
          },
        },
      ],
    },
  ],
  name: "pansage",
  order: 626,
  past_types: [],
  species: {
    name: "pansage",
    url: "https://pokeapi.co/api/v2/pokemon-species/511/",
  },
  sprites: {
    back_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/511.png",
    back_female: null,
    back_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/511.png",
    back_shiny_female: null,
    front_default:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/511.png",
    front_female: null,
    front_shiny:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/511.png",
    front_shiny_female: null,
    other: {
      dream_world: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/511.svg",
        front_female: null,
      },
      home: {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/511.png",
        front_female: null,
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/shiny/511.png",
        front_shiny_female: null,
      },
      "official-artwork": {
        front_default:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/511.png",
        front_shiny:
          "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/511.png",
      },
    },
  },
  stats: [
    {
      base_stat: 50,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 53,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 48,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
    },
    {
      base_stat: 53,
      effort: 0,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 48,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 64,
      effort: 1,
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
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
    },
  ],
  weight: 105,
} as IPokemonFull;

export const fakeSimipourFull = {
  abilities: [
    {
      ability: {
        name: "gluttony",
        url: "https://pokeapi.co/api/v2/ability/82/",
      },
      is_hidden: false,
      slot: 1,
    },
    {
      ability: {
        name: "torrent",
        url: "https://pokeapi.co/api/v2/ability/67/",
      },
      is_hidden: true,
      slot: 3,
    },
  ],
  base_experience: 174,
  forms: [
    {
      name: "simipour",
      url: "https://pokeapi.co/api/v2/pokemon-form/516/",
    },
  ],
  height: 10,
  id: 516,
  is_default: true,
  location_area_encounters: "https://pokeapi.co/api/v2/pokemon/516/encounters",
  name: "simipour",
  order: 631,
  past_types: [],
  species: {
    name: "simipour",
    url: "https://pokeapi.co/api/v2/pokemon-species/516/",
  },
  stats: [
    {
      base_stat: 75,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 98,
      effort: 0,
      stat: {
        name: "attack",
        url: "https://pokeapi.co/api/v2/stat/2/",
      },
    },
    {
      base_stat: 63,
      effort: 0,
      stat: {
        name: "defense",
        url: "https://pokeapi.co/api/v2/stat/3/",
      },
    },
    {
      base_stat: 98,
      effort: 0,
      stat: {
        name: "special-attack",
        url: "https://pokeapi.co/api/v2/stat/4/",
      },
    },
    {
      base_stat: 63,
      effort: 0,
      stat: {
        name: "special-defense",
        url: "https://pokeapi.co/api/v2/stat/5/",
      },
    },
    {
      base_stat: 101,
      effort: 2,
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
        name: "water",
        url: "https://pokeapi.co/api/v2/type/11/",
      },
    },
  ],
  weight: 290,
} as unknown as IPokemonFull;

// *******************************
// POKEMON SKELETONS
// *******************************

export const fakeAbraSkeleton = {
  id: 0,
  name: "abra",
  moves: { 1: "confusion", 2: "", 3: "", 4: "" },
};

// const fakeKadabra = {
//   id: 1,
//   name: "kadabra",
//   moves: { 1: "", 2: "", 3: "", 4: "" },
// };

export const fakeAlakazamSkeleton = {
  id: 2,
  name: "alakazam",
  moves: { 1: "confusion", 2: "", 3: "", 4: "" },
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

export const fakePansage = {
  id: 3,
  name: "pansage",
  moves: { 1: "vine-whip", 2: "", 3: "", 4: "" },
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

export const fakeAstonish = {
  accuracy: 100,
  damage_class: {
    name: "physical",
    url: "https://pokeapi.co/api/v2/move-damage-class/2/",
  },
  effect_chance: 30,
  effect_changes: [],
  generation: {
    name: "generation-iii",
    url: "https://pokeapi.co/api/v2/generation/3/",
  },
  id: 310,
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
    flinch_chance: 30,
    healing: 0,
    max_hits: null,
    max_turns: null,
    min_hits: null,
    min_turns: null,
    stat_chance: 0,
  },
  name: "astonish",
  past_values: [],
  power: 30,
  pp: 15,
  priority: 0,
  stat_changes: [],
  super_contest_effect: {
    url: "https://pokeapi.co/api/v2/super-contest-effect/5/",
  },
  target: {
    name: "selected-pokemon",
    url: "https://pokeapi.co/api/v2/move-target/10/",
  },
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

export const fakeVineWhip = {
  accuracy: 100,
  damage_class: {
    name: "physical",
    url: "https://pokeapi.co/api/v2/move-damage-class/2/",
  },
  effect_chance: null,
  effect_changes: [],
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 22,
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
  name: "vine-whip",
  past_values: [
    {
      accuracy: null,
      effect_chance: null,
      effect_entries: [],
      power: null,
      pp: 10,
      type: null,
      version_group: {
        name: "diamond-pearl",
        url: "https://pokeapi.co/api/v2/version-group/8/",
      },
    },
    {
      accuracy: null,
      effect_chance: null,
      effect_entries: [],
      power: 35,
      pp: 15,
      type: null,
      version_group: {
        name: "x-y",
        url: "https://pokeapi.co/api/v2/version-group/15/",
      },
    },
  ],
  power: 45,
  pp: 25,
  priority: 0,
  stat_changes: [],
  target: {
    name: "selected-pokemon",
    url: "https://pokeapi.co/api/v2/move-target/10/",
  },
  type: {
    name: "grass",
    url: "https://pokeapi.co/api/v2/type/12/",
  },
};

export const fakeAgility = {
  accuracy: null,
  damage_class: {
    name: "status",
    url: "https://pokeapi.co/api/v2/move-damage-class/1/",
  },
  effect_chance: null,
  effect_changes: [],
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 97,
  machines: [
    {
      machine: {
        url: "https://pokeapi.co/api/v2/machine/1601/",
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
      name: "net-good-stats",
      url: "https://pokeapi.co/api/v2/move-category/2/",
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
  name: "agility",
  past_values: [],
  power: null,
  pp: 30,
  priority: 0,
  stat_changes: [
    {
      change: 2,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
  ],
  type: {
    name: "psychic",
    url: "https://pokeapi.co/api/v2/type/14/",
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

export const fakePsychicType = {
  damage_relations: {
    double_damage_from: [
      {
        name: "bug",
        url: "https://pokeapi.co/api/v2/type/7/",
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
    double_damage_to: [
      {
        name: "fighting",
        url: "https://pokeapi.co/api/v2/type/2/",
      },
      {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
    ],
    half_damage_from: [
      {
        name: "fighting",
        url: "https://pokeapi.co/api/v2/type/2/",
      },
      {
        name: "psychic",
        url: "https://pokeapi.co/api/v2/type/14/",
      },
    ],
    half_damage_to: [
      {
        name: "steel",
        url: "https://pokeapi.co/api/v2/type/9/",
      },
      {
        name: "psychic",
        url: "https://pokeapi.co/api/v2/type/14/",
      },
    ],
    no_damage_from: [],
    no_damage_to: [
      {
        name: "dark",
        url: "https://pokeapi.co/api/v2/type/17/",
      },
    ],
  },
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 14,
  move_damage_class: {
    name: "special",
    url: "https://pokeapi.co/api/v2/move-damage-class/3/",
  },
  name: "psychic",
  past_damage_relations: [
    {
      damage_relations: {
        double_damage_from: [
          {
            name: "bug",
            url: "https://pokeapi.co/api/v2/type/7/",
          },
        ],
        double_damage_to: [
          {
            name: "fighting",
            url: "https://pokeapi.co/api/v2/type/2/",
          },
          {
            name: "poison",
            url: "https://pokeapi.co/api/v2/type/4/",
          },
        ],
        half_damage_from: [
          {
            name: "fighting",
            url: "https://pokeapi.co/api/v2/type/2/",
          },
          {
            name: "psychic",
            url: "https://pokeapi.co/api/v2/type/14/",
          },
        ],
        half_damage_to: [
          {
            name: "psychic",
            url: "https://pokeapi.co/api/v2/type/14/",
          },
        ],
        no_damage_from: [
          {
            name: "ghost",
            url: "https://pokeapi.co/api/v2/type/8/",
          },
        ],
        no_damage_to: [],
      },
      generation: {
        name: "generation-i",
        url: "https://pokeapi.co/api/v2/generation/1/",
      },
    },
  ],
};

export const fakeGrassType = {
  damage_relations: {
    double_damage_from: [
      {
        name: "flying",
        url: "https://pokeapi.co/api/v2/type/3/",
      },
      {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
      },
      {
        name: "bug",
        url: "https://pokeapi.co/api/v2/type/7/",
      },
      {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
      {
        name: "ice",
        url: "https://pokeapi.co/api/v2/type/15/",
      },
    ],
    double_damage_to: [
      {
        name: "ground",
        url: "https://pokeapi.co/api/v2/type/5/",
      },
      {
        name: "rock",
        url: "https://pokeapi.co/api/v2/type/6/",
      },
      {
        name: "water",
        url: "https://pokeapi.co/api/v2/type/11/",
      },
    ],
    half_damage_from: [
      {
        name: "ground",
        url: "https://pokeapi.co/api/v2/type/5/",
      },
      {
        name: "water",
        url: "https://pokeapi.co/api/v2/type/11/",
      },
      {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
      {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
    ],
    half_damage_to: [
      {
        name: "flying",
        url: "https://pokeapi.co/api/v2/type/3/",
      },
      {
        name: "poison",
        url: "https://pokeapi.co/api/v2/type/4/",
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
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
      {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
      {
        name: "dragon",
        url: "https://pokeapi.co/api/v2/type/16/",
      },
    ],
    no_damage_from: [],
    no_damage_to: [],
  },
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 12,
  move_damage_class: {
    name: "special",
    url: "https://pokeapi.co/api/v2/move-damage-class/3/",
  },
  name: "grass",
  past_damage_relations: [],
};

export const fakeWaterType = {
  damage_relations: {
    double_damage_from: [
      {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
      {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
    ],
    double_damage_to: [
      {
        name: "ground",
        url: "https://pokeapi.co/api/v2/type/5/",
      },
      {
        name: "rock",
        url: "https://pokeapi.co/api/v2/type/6/",
      },
      {
        name: "fire",
        url: "https://pokeapi.co/api/v2/type/10/",
      },
    ],
    half_damage_from: [
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
        name: "ice",
        url: "https://pokeapi.co/api/v2/type/15/",
      },
    ],
    half_damage_to: [
      {
        name: "water",
        url: "https://pokeapi.co/api/v2/type/11/",
      },
      {
        name: "grass",
        url: "https://pokeapi.co/api/v2/type/12/",
      },
      {
        name: "dragon",
        url: "https://pokeapi.co/api/v2/type/16/",
      },
    ],
    no_damage_from: [],
    no_damage_to: [],
  },
  generation: {
    name: "generation-i",
    url: "https://pokeapi.co/api/v2/generation/1/",
  },
  id: 11,
  move_damage_class: {
    name: "special",
    url: "https://pokeapi.co/api/v2/move-damage-class/3/",
  },
  name: "water",
  past_damage_relations: [],
};

import { createContext } from "react";

import type { IPokemon } from "./interfaces";

export const PokemonContext = createContext<{
  gen: number;
  team: IPokemon[];
  mergeIntoTeam: (arg0: IPokemon) => void;
  bench: IPokemon[];
  mergeIntoBench: (arg0: IPokemon) => void;
  idCounter: number;
}>({
  gen: 0,
  team: [],
  mergeIntoTeam: (target) => {},
  bench: [],
  mergeIntoBench: (target) => {},
  idCounter: 0,
});

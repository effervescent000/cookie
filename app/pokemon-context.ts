import { createContext } from "react";

import type { IPokemonFull } from "./interfaces";

export const PokemonContext = createContext<{
  gen: number;
  team: IPokemonFull[];
  mergeIntoTeam: (arg0: IPokemonFull) => void;
  bench: IPokemonFull[];
  mergeIntoBench: (arg0: IPokemonFull) => void;
  idCounter: number;
}>({
  gen: 0,
  team: [],
  mergeIntoTeam: (target) => {},
  bench: [],
  mergeIntoBench: (target) => {},
  idCounter: 0,
});

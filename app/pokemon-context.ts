import { createContext } from "react";

import type { IPokemonFull } from "./interfaces";

export const PokemonContext = createContext<{
  gen: number;
  region: string;
  team: IPokemonFull[];
  mergeIntoTeam: (arg0: IPokemonFull) => void;
  bench: IPokemonFull[];
  mergeIntoBench: (arg0: IPokemonFull) => void;
  idCounter: number;
}>({
  gen: 0,
  region: "",
  team: [],
  mergeIntoTeam: (target) => {},
  bench: [],
  mergeIntoBench: (target) => {},
  idCounter: 0,
});

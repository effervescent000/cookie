import { createContext } from "react";

import type { IPokemonFull } from "./interfaces";

export const PokemonContext = createContext<{
  gen: number;
  setGen: (arg0: number) => void;
  region: string;
  setRegion: (arg0: string) => void;
  team: IPokemonFull[];
  mergeIntoTeam: (arg0: IPokemonFull) => void;
  bench: IPokemonFull[];
  mergeIntoBench: (arg0: IPokemonFull) => void;
  idCounter: number;
}>({
  gen: 0,
  setGen: (target) => {},
  region: "",
  setRegion: (target) => {},
  team: [],
  mergeIntoTeam: (target) => {},
  bench: [],
  mergeIntoBench: (target) => {},
  idCounter: 0,
});

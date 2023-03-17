import { createContext } from "react";

import type { IPokemonFull } from "./interfaces";

export const PokemonContext = createContext<{
  gen: string;
  setGen: (arg0: string) => void;
  versionGroup: string;
  setVersionGroup: (arg0: string) => void;
  region: string;
  setRegion: (arg0: string) => void;
  team: IPokemonFull[];
  mergeIntoTeam: (arg0: IPokemonFull) => void;
  bench: IPokemonFull[];
  mergeIntoBench: (arg0: IPokemonFull) => void;
  idCounter: number;
  removeFromTeam: (arg0: IPokemonFull) => void;
  removeFromBench: (arg0: IPokemonFull) => void;
}>({
  gen: "",
  setGen: (target) => {},
  region: "",
  setRegion: (target) => {},
  team: [],
  mergeIntoTeam: (target) => {},
  bench: [],
  mergeIntoBench: (target) => {},
  idCounter: 0,
  versionGroup: "",
  setVersionGroup: (target) => {},
  removeFromBench: (target) => {},
  removeFromTeam: (target) => {},
});

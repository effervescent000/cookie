import { createContext } from "react";

import type { IPokemonFull, IPokeSkeleton, IValues } from "./interfaces";

export const PokemonContext = createContext<{
  gen: string;
  setGen: (arg0: string) => void;
  versionGroup: string;
  setVersionGroup: (arg0: string) => void;
  region: string;
  setRegion: (arg0: string) => void;
  team: IPokeSkeleton[];
  mergeIntoTeam: (arg0: IPokeSkeleton) => void;
  bench: IPokeSkeleton[];
  mergeIntoBench: (arg0: IPokeSkeleton) => void;
  idCounter: number;
  removeFromTeam: (arg0: IPokeSkeleton) => void;
  removeFromBench: (arg0: IPokeSkeleton) => void;
  focusedPokemon: IPokemonFull | undefined;
  setFocusedPokemon: (arg0: IPokemonFull | undefined) => void;
  teamDefScores: IValues;
  setTeamDefScores: (arg0: IValues) => void;
  teamOffScores: IValues;
  setTeamOffScores: (arg0: IValues) => void;
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
  focusedPokemon: undefined,
  setFocusedPokemon: (target) => {},
  teamDefScores: {},
  setTeamDefScores: (values) => {},
  teamOffScores: {},
  setTeamOffScores: (values) => {},
});

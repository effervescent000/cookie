import { createContext } from "react";

import type {
  IMoveScores,
  IPokemonFull,
  IPokeSkeleton,
  ITeamTypeScores,
  IValues,
} from "./interfaces";

export const PokemonContext = createContext<{
  gen: number;
  setGen: (arg0: number) => void;
  versionGroup: string;
  setVersionGroup: (arg0: string) => void;
  team: IPokeSkeleton[];
  mergeIntoTeam: (arg0: IPokeSkeleton) => void;
  bench: IPokeSkeleton[];
  mergeIntoBench: (arg0: IPokeSkeleton) => void;
  idCounter: number;
  removeFromTeam: (arg0: IPokeSkeleton) => void;
  removeFromBench: (arg0: IPokeSkeleton) => void;
  focusedPokemon: IPokemonFull | undefined;
  setFocusedPokemon: (arg0: IPokemonFull | undefined) => void;
  teamDefScores: ITeamTypeScores;
  setTeamDefScores: (arg0: {
    final: number;
    raw: { [key: string]: { [key: string]: number } };
    processed: IValues;
  }) => void;
  teamOffScores: ITeamTypeScores;
  setTeamOffScores: (arg0: {
    final: number;
    raw: { [key: string]: { [key: string]: number } };
    processed: IValues;
  }) => void;
  activeProfileId: number;
  setActiveProfileId: (arg0: number) => void;
  addNewProfile: () => void;
  moveScores: IMoveScores;
  statScores: { [id: number]: number | undefined };
}>({
  gen: 0,
  setGen: (target) => {},
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
  teamDefScores: { final: 0, raw: {}, processed: {} },
  setTeamDefScores: (values) => {},
  teamOffScores: { final: 0, raw: {}, processed: {} },
  setTeamOffScores: (values) => {},
  activeProfileId: 0,
  setActiveProfileId: (target) => {},
  addNewProfile: () => {},
  moveScores: {},
  statScores: {},
});

import type {
  IMoveResponse,
  IPokemonFull,
  IResourceListItem,
} from "~/interfaces";

export const isFullPokemon = (
  poke: IPokemonFull | IResourceListItem
): poke is IPokemonFull => !!(poke as IPokemonFull).moves;

export const isFullMove = (
  move: IMoveResponse | IResourceListItem
): move is IMoveResponse => !!(move as IMoveResponse).generation;

import type { IPokemonFull, IResourceListItem } from "~/interfaces";

export const isFullPokemon = (
  poke: IPokemonFull | IResourceListItem
): poke is IPokemonFull => (poke as IResourceListItem).url === undefined;

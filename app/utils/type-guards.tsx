import type { IPokemonFull, IPokemonMini } from "~/interfaces";

export const isFullPokemon = (
  poke: IPokemonFull | IPokemonMini
): poke is IPokemonFull => (poke as IPokemonMini).url === undefined;

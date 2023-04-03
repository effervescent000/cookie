import { makeDataCy } from "./utils";

export const EXPAND = makeDataCy("focus-btn");
export const FOCUS_FRAME = makeDataCy("focus-frame");
export const VERSUS_CARD = makeDataCy("versus-card");
export const SHOW_GUIDANCE = makeDataCy("guidance-checkbox");

export const getMiniCard = (pokemon: string) =>
  makeDataCy(`mini-card-${pokemon}`);
export const getPokemonCard = (pokemon: string) =>
  makeDataCy(`poke-card-${pokemon}`);
export const getMoveSlot = (slot: number) => makeDataCy(`move-${slot}`);

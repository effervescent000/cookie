import type { IType } from "~/interfaces";

const ALL_TYPES: IType[] = [
  { key: "normal", abbr: "NRML", bgColor: "#6D6D4E" },
  { key: "fighting", bgColor: "#7D1F1A", abbr: "FGHT" },
  { key: "flying", bgColor: "#6D5E9C", abbr: "FLY" },
  { key: "poison", bgColor: "#682A68", abbr: "PSN" },
  { key: "ground", bgColor: "#927D44", abbr: "GRND" },
  { key: "rock", bgColor: "#786824", abbr: "ROCK" },
  { key: "bug", bgColor: "#6D7815", abbr: "BUG" },
  { key: "ghost", bgColor: "#493963", abbr: "GHST" },
  { key: "steel", bgColor: "#787887", abbr: "STL", gen: 2 },
  { key: "fire", bgColor: "#9C531F", abbr: "FIRE" },
  { key: "water", bgColor: "#445E9C", abbr: "WTR" },
  { key: "grass", bgColor: "#4E8234", abbr: "GRS" },
  { key: "electric", bgColor: "#A1871F", abbr: "ELEC" },
  { key: "psychic", bgColor: "#A13959", abbr: "PSY" },
  { key: "ice", bgColor: "#638D8D", abbr: "ICE" },
  { key: "dragon", bgColor: "#4924A1", abbr: "DRGN" },
  { key: "dark", bgColor: "#49392F", abbr: "DARK", gen: 2 },
  { key: "fairy", bgColor: "#9B6470", abbr: "FAIR", gen: 6 },
];

export const getTypes = (selectedGen: number = 9) =>
  ALL_TYPES.filter(({ gen }) => !gen || gen <= selectedGen);

export const OFFENSIVE_KEY = "offensive";
export const DEFENSIVE_KEY = "defensive";

export const DAMAGE_RELATION_VALUES: { [key: string]: number } = {
  double_damage_from: 2,
  double_damage_to: 2,
  half_damage_from: 0.5,
  half_damage_to: 0.5,
  no_damage_from: 0,
  no_damage_to: 0,
};

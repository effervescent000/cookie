import type { IType } from "~/interfaces";

export const TYPES: IType[] = [
  {
    key: "normal",
    color: "#C6C6A7",
    bgColor: "#6D6D4E",
  },
  { key: "fighting", bgColor: "#7D1F1A", color: "#D67873" },
  { key: "flying", bgColor: "#6D5E9C", color: "#C6B7F5" },
  { key: "poison", bgColor: "#682A68", color: "#C183C1" },
  { key: "ground", bgColor: "#927D44", color: "#EBD69D" },
  { key: "rock", bgColor: "#786824" },
  { key: "bug", bgColor: "#6D7815" },
  { key: "ghost", bgColor: "#493963" },
  { key: "steel", bgColor: "#787887" },
  { key: "fire", bgColor: "#9C531F" },
  { key: "water", bgColor: "#445E9C" },
  { key: "grass", bgColor: "#4E8234" },
  { key: "electric", bgColor: "#A1871F" },
  { key: "psychic", bgColor: "#A13959" },
  { key: "ice", bgColor: "#638D8D" },
  { key: "dragon", bgColor: "#4924A1" },
  { key: "dark", bgColor: "#49392F" },
  { key: "fairy", bgColor: "#9B6470" },
];

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

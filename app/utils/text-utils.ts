import { GEN_LOOKUP_BY_ROMAN_NUMERAL } from "~/constants/versions-constants";
import type { IOptions, IResourceListItem } from "~/interfaces";

export const properCase = (str: string) =>
  str
    .replace(/-/g, " ")
    .replace(/\b\S/g, (match: string) => match.charAt(0).toUpperCase());

export const sortObjectByValue = (a: IOptions, b: IOptions) => {
  if (a.value < b.value) return -1;
  if (a.value > b.value) return 1;
  return 0;
};

export const sortObject = (a: any, b: any, key: string = "name") => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

export const getGeneration = (generation: IResourceListItem) =>
  GEN_LOOKUP_BY_ROMAN_NUMERAL[generation.name.split("-")[1].toUpperCase()]
    .value;

export const getMoveName = (move: string) => move.replace("_other:", "");

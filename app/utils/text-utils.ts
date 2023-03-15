import type { IOptions } from "~/interfaces";

export const properCase = (str: string) =>
  str
    .replace("-", " ")
    .replace(/\b\S/g, (match: string) => match.charAt(0).toUpperCase());

export const sortObjectByValue = (a: IOptions, b: IOptions) => {
  if (a.value < b.value) return -1;
  if (a.value > b.value) return 1;
  return 0;
};

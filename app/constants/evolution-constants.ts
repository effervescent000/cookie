import { properCase } from "~/utils/text-utils";

export const TRIGGER_FALLBACK = "fallback";

export const TRIGGER_MATCH: {
  [key: string]: [string, (arg0: any) => string][];
} = {
  "level-up": [
    ["min_level", (level: number) => `at level ${level}`],
    [
      "location.name",
      (location: string) => `by leveling up in ${properCase(location)}`,
    ],
    ["min_happiness", (happiness: number) => `at Happiness ${happiness}`],
  ],
  "use-item": [["item.name", (item: string) => `with a ${properCase(item)}`]],
  trade: [
    [
      "held_item.name",
      (item: string) => `by trading with a ${properCase(item)}`,
    ],
    [TRIGGER_FALLBACK, () => "by trading"],
  ],
};

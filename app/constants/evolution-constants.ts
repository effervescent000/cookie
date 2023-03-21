import { properCase } from "~/utils/text-utils";

export const TRIGGER_MATCH: {
  [key: string]: [string, (arg0: any) => string][];
} = {
  "level-up": [
    ["min_level", (level: number) => `at level ${level}`],
    [
      "location.name",
      (location: string) => `by leveling up in ${properCase(location)}`,
    ],
  ],
  "use-item": [["item.name", (item: string) => `with a ${properCase(item)}`]],
};

// export const TRIGGER_MATCH = [
//   [
//     "level-up",
//     [
//       ["min_level", (level: number) => `at level ${level}`],
//       [
//         "location.name",
//         (location: string) => `by leveling up in ${properCase(location)}`,
//       ],
//     ],
//   ],
//   ["use-item", [["item.name", (item: string) => `with a ${properCase(item)}`]]],
// ];

// export const TRIGGER_MATCH = {
//   "level-up": {
//     "min-level"
//   }
// }

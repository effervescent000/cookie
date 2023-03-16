export const REGIONS = [
  "kanto",
  "johto",
  "hoenn",
  "sinnoh",
  "unova",
  "kalos",
  "alola",
  "galar",
  "paldea",
];

export const VERSIONS = [
  {
    name: "I",
    children: [
      { name: "R/B", key: "red-blue" },
      { name: "Y", key: "yellow" },
    ],
  },
  {
    name: "II",
    children: [
      { name: "G/S", key: "gold-silver" },
      { name: "C", key: "crystal" },
    ],
  },
  {
    name: "III",
    children: [
      { name: "R/S", key: "ruby-sapphire" },
      { name: "E", key: "emerald" },
      { name: "FRLG", key: "firered-leafgreen" },
      // there are other non main series games here
    ],
  },
  {
    name: "IV",
    children: [
      { name: "D/P", key: "diamond-pearl" },
      { name: "P", key: "platinum" },
      { name: "HG/SS", key: "heartgold-soulsilver" },
    ],
  },
  {
    name: "V",
    children: [
      { name: "B/W", key: "black-white" },
      { name: "B2/W2", key: "black-2-white-2" },
    ],
  },
  {
    name: "VI",
    children: [
      { name: "X/Y", key: "x-y" },
      { name: "OR/AS", key: "omega-ruby-alpha-sapphire" },
    ],
  },
  {
    name: "VII",
    children: [
      { name: "S/M", key: "sun-moon" },
      { name: "US/UM", key: "ultra-sun-ultra-moon" },
      // the let's go games are here
    ],
  },
  {
    name: "VIII",
    children: [
      { name: "S/S", key: "sword-shield" },
      { name: "BD/SP", key: "brilliant-diamond-and-shining-pearl" },
      { name: "L:A", key: "legends-arceus" },
    ],
  },
  { name: "IX", children: [{ name: "S/V", key: "scarlet-violet" }] },
];

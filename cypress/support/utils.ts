export const makeDataCy = (label: string) => `[data-cy="${label}"]`;

export const parseAllValues = (obj: { [key: string]: string }) =>
  Object.entries(obj)
    .map(([key, value]) => ({ [key]: JSON.parse(value) }))
    .reduce((acc, cur) => ({ ...acc, ...cur }), {});

export const extractSearchFromUrl = (url: string) => url.match(/\/(\w+-?)+$/);

export const defaultWaitUntilConfigs = { timeout: 10000, interval: 500 };

export const makeIntercepts = () => {
  cy.intercept("**/v2/pokemon/*", (req) => {
    const targetPokemon = extractSearchFromUrl(req.url);
    req.reply({ fixture: `pokemon/${targetPokemon}.json` });
  }).as("getPokemon");

  cy.intercept("**/v2/move/*", (req) => {
    const targetMove = extractSearchFromUrl(req.url);
    req.reply({ fixture: `moves/${targetMove}.json` });
  }).as("getMove");

  cy.intercept("**/v2/move", (req) => {
    req.reply({ fixture: `moves/_all_moves.json` });
  }).as("getMove");

  cy.intercept("**/v2/type/*", (req) => {
    const targetType = extractSearchFromUrl(req.url);
    req.reply({ fixture: `types/${targetType}.json` });
  }).as("getType");

  cy.intercept("**/v2/pokemon", (req) => {
    req.reply({ fixture: "pokemon/_all_pokemon.json" });
  });
};

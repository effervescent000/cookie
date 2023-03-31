import {
  defaultWaitUntilConfigs,
  extractSearchFromUrl,
  makeDataCy,
} from "support/utils";

describe("roster management tests", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    cy.intercept("**/v2/pokemon/*", (req) => {
      const targetPokemon = extractSearchFromUrl(req.url);
      req.reply({ fixture: `pokemon/${targetPokemon}.json` });
    }).as("getPokemon");

    cy.intercept("**/v2/move/*", (req) => {
      const targetMove = extractSearchFromUrl(req.url);
      req.reply({ fixture: `moves/${targetMove}.json` });
    }).as("getMove");

    cy.intercept("**/v2/type/*", (req) => {
      const targetType = extractSearchFromUrl(req.url);
      req.reply({ fixture: `types/${targetType}.json` });
    }).as("getType");
  });

  it("can add a pokemon to the bench and team", () => {
    cy.addLocalStorage("empty-roster-s-s");
    cy.get(makeDataCy("mini-card-abra"))
      .find(makeDataCy("add-to-bench"))
      .click();
    cy.get(makeDataCy("frame-bench"))
      .find(makeDataCy("poke-card-abra"))
      .find(makeDataCy("bench-to-team"))
      .click();
    cy.get(makeDataCy("frame-team")).find(makeDataCy("poke-card-abra"));
  });

  it("can delete a pokemon from the team", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.get(makeDataCy("frame-team"))
      .find(makeDataCy("poke-card-abra"))
      .find(makeDataCy("delete"))
      .click();
    cy.get(makeDataCy("frame-team"))
      .find(makeDataCy("poke-card-abra"))
      .should("not.exist");
  });

  it("can select moves that previous evolutions could learn", () => {
    cy.addLocalStorage("jolteon-in-roster-s-m");
    cy.waitUntil(
      () => cy.get(makeDataCy("poke-card-jolteon")).as("jolteon"),
      defaultWaitUntilConfigs
    );
    cy.get("@jolteon")
      .find(makeDataCy("move-0"))
      .as("jolteonMoves")
      .contains("Bite");
    cy.get("@jolteonMoves")
      .find("option")
      .filter(":contains('Confide')")
      .should("have.length", 1);
  });
});

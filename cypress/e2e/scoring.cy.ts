import { makeDataCy } from "support/utils";

const abraCard = "poke-card-abra";

describe("Tests for move functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    // cy.intercept("**/v2/pokemon/*", (req) => {
    //   const targetPokemon = extractSearchFromUrl(req.url);

    //   req.reply({ fixture: `pokemon/${targetPokemon}.json` });
    // }).as("getPokemon");
    // cy.intercept("**/v2/move/*", (req) => {
    //   const targetMove = extractSearchFromUrl(req.url);
    //   req.reply({ fixture: `moves/${targetMove}.json` });
    // }).as("getMove");
    // cy.intercept("**/v2/type/*", (req) => {
    //   const targetType = extractSearchFromUrl(req.url);
    //   req.reply({ fixture: `types/${targetType}.json` });
    // }).as("getType");
    // cy.wait(1000);
  });

  it("initializes move score properly", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.get(makeDataCy(abraCard)).as("abraCard").contains("Move score");
    cy.wait(1000);
    cy.get("@abraCard")
      .find(makeDataCy("move-score-card"))
      .contains(/\d+\.\d/);
  });

  it("re-calculates move score when moves change", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.waitUntil(() =>
      cy
        .get(makeDataCy("poke-card-abra"))
        .as("abra")
        .find(makeDataCy("move-score-card"))
        .find("svg")
        .should("not.exist")
        .then(() => {
          cy.get("@abra").find(makeDataCy("move-0")).select("teleport");
          cy.get("@abra").find(makeDataCy("move-score-card")).find("svg");
        })
    );
  });

  it("only recalculates for the changed pokemon", () => {
    cy.addLocalStorage("two-pokemon-in-team-s-s");
    // wait until the move score is settled before proceeding

    cy.waitUntil(() =>
      cy
        .get(makeDataCy("poke-card-abra"))
        .find(makeDataCy("move-score-card"))
        .find("svg")
        .should("not.exist")
        .then(() => {
          cy.get(makeDataCy("poke-card-alakazam"))
            .find(makeDataCy("move-score-card"))
            .should("not.have.descendants", "svg");
        })
    );
  });
});

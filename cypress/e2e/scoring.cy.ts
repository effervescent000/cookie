import { makeDataCy, makeIntercepts } from "support/utils";

const abraCard = "poke-card-abra";

describe("Tests for move functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    makeIntercepts();
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
    cy.wait(1000);
    cy.get(makeDataCy("poke-card-abra"))
      .find(makeDataCy("move-score-card"))
      .find("svg")
      .should("not.exist")
      .then(() => {
        cy.get(makeDataCy("poke-card-alakazam"))
          .find(makeDataCy("move-score-card"))
          .should("not.have.descendants", "svg");
      });
  });
});

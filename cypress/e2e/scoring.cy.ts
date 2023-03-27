import { makeDataCy } from "support/utils";

const abraCard = "poke-card-abra";

describe("Tests for move functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
  });

  it("initializes move score properly", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.get(makeDataCy(abraCard)).as("abraCard").contains("Move score");
    cy.get("@abraCard")
      .find(makeDataCy("move-score-card"))
      .contains(/\d+\.\d/);
  });

  it("re-calculates move score when moves change", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.get(makeDataCy("poke-card-abra"))
      .as("abraCard")
      .find(makeDataCy("move-0"))
      .select("teleport");
    cy.get("@abraCard").find(makeDataCy("move-score-card")).find("svg");
  });

  it("only recalculates for the changed pokemon", () => {
    cy.addLocalStorage("two-pokemon-in-team-s-s");
    cy.get(makeDataCy("poke-card-abra"))
      .find(makeDataCy("move-0"))
      .select("teleport");
    cy.get(makeDataCy("poke-card-alakazam"))
      .find(makeDataCy("move-score-card"))
      .find("svg")
      .should("not.exist");
  });

  it("builds a stat delta for pokemon in bench", () => {
    cy.addLocalStorage("two-in-team-one-in-bench-s-s");
    cy.get(makeDataCy("poke-card-sylveon"))
      .as("alaCard")
      .find(makeDataCy("delta-card"))
      .contains(/\d+\.\d$/);
  });
});

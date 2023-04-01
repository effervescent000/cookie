import {
  defaultWaitUntilConfigs,
  makeDataCy,
  makeIntercepts,
} from "support/utils";

describe("roster management tests", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    makeIntercepts();
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
      () => cy.get(makeDataCy("poke-card-jolteon")),
      defaultWaitUntilConfigs
    )
      .then((jolteonCard) => cy.wrap(jolteonCard).find(makeDataCy("move-0")))
      .as("jolteonMoves")
      .contains("Bite");
    cy.get("@jolteonMoves")
      .find("option")
      .filter(":contains('Confide')")
      .should("have.length", 1);
  });
});

import { getMoveSlot, getPokemonCard } from "support/constants";
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

  it("can select a move", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.waitUntil(() => cy.get(getPokemonCard("abra"))).then((abra) => {
      cy.wrap(abra)
        .find(getMoveSlot(0))
        .as("moveSlot")
        .select("body-slam")
        .should("have.value", "body-slam");
    });
  });

  it("contains moves that previous evolutions could learn", () => {
    cy.addLocalStorage("jolteon-in-roster-s-m");
    cy.waitUntil(
      () =>
        cy
          .get(makeDataCy("poke-card-jolteon"))
          .find(makeDataCy("move-0"))
          .find("option")
          .filter(":contains('Confide')")
          .should("have.length", 1),
      defaultWaitUntilConfigs
    );
  });
});

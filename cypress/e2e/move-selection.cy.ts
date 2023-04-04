import { getMoveSlot, getPokemonCard } from "support/constants";
import {
  defaultWaitUntilConfigs,
  makeDataCy,
  makeIntercepts,
} from "support/utils";

describe("tests re: working with moves", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    makeIntercepts();
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
          .get(getPokemonCard("jolteon"))
          .find(getMoveSlot(0))
          .find("option")
          .filter(":contains('Confide')")
          .should("have.length", 1),
      defaultWaitUntilConfigs
    );
  });

  it("can select a custom move", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.waitUntil(() => cy.get(getPokemonCard("abra"))).then((abra) =>
      cy.wrap(abra).find(getMoveSlot(0)).select("_other")
    );
    cy.get(makeDataCy("custom-move-input")).should("exist");
  });
});

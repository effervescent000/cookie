import {
  EXPAND,
  FOCUS_FRAME,
  getMiniCard,
  getMoveSlot,
  getPokemonCard,
  SHOW_GUIDANCE,
} from "support/constants";
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
      cy.wrap(abra).find(getMoveSlot(0)).as("moveSelect").select("_other")
    );
    cy.get(makeDataCy("custom-move-input"))
      .as("custom-move-input")
      .type("bliz");
    cy.wait(100);
    cy.get(makeDataCy("custom-move-blizzard")).click();
    cy.wait(50);
    cy.get("@custom-move-input").should("have.value", "blizzard");
    cy.get("@moveSelect").should("have.value", "_other");
  });

  it("can use custom moves with guidance on", () => {
    cy.addLocalStorage("two-pokemon-in-team-with-moves-s-s");
    cy.get(getMiniCard("abra")).find(EXPAND).click();
    cy.get(FOCUS_FRAME).find(SHOW_GUIDANCE).click();
  });
});

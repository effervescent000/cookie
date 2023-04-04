import {
  EXPAND,
  FOCUS_FRAME,
  getMiniCard,
  getMoveSlot,
  getPokemonCard,
  SHOW_GUIDANCE,
} from "support/constants";
import { makeDataCy, makeIntercepts } from "support/utils";

describe("tests specifically related to versus moves functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    makeIntercepts();
  });

  it("can select a move", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.waitUntil(() => cy.get(getPokemonCard("abra"))).then((abra) => {
      cy.wrap(abra).find(getMoveSlot(0)).select("confusion");
    });
    cy.get(getMiniCard("abra")).find(EXPAND).click();
    cy.waitUntil(() => cy.get(FOCUS_FRAME)).then((focusedAbra) => {
      cy.get(SHOW_GUIDANCE).click();
      cy.wrap(focusedAbra)
        .find(getMoveSlot(0))
        .select("body-slam")
        .should("have.value", "body-slam");
    });
  });

  it("clears out old move data when changing focus targets", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.waitUntil(() => cy.get(getPokemonCard("abra"))).then((abra) => {
      cy.wrap(abra).find(getMoveSlot(0)).select("confusion");
    });
    cy.get(getMiniCard("abra")).find(EXPAND).click();
    cy.waitUntil(() => cy.get(FOCUS_FRAME)).then((focusedAbra) => {
      cy.get(SHOW_GUIDANCE).click();
      cy.wrap(focusedAbra)
        .find(makeDataCy("score-0"))
        .then((score) => {
          cy.wrap(focusedAbra).find(getMoveSlot(0)).select("body-slam");
          cy.wrap(focusedAbra).find(getMoveSlot(1)).select("confusion");
          cy.get(getMiniCard("jolteon")).find(EXPAND).click();
          cy.wait(100);
          cy.get(FOCUS_FRAME).then((focusedJolteon) => {
            cy.wrap(focusedJolteon).find(getMoveSlot(0)).select("double-kick");
          });
          cy.wait(100);
          cy.get(getMiniCard("abra")).find(EXPAND).click();
          cy.get(FOCUS_FRAME)
            .find(makeDataCy("score-0"))
            .should("have.text", score.text());
        });
    });
  });
});

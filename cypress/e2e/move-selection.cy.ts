import {
  EXPAND,
  FOCUS_FRAME,
  getMiniCard,
  getMoveSlot,
  getPokemonCard,
  SHOW_GUIDANCE,
} from "support/constants";
import { makeDataCy, makeIntercepts } from "support/utils";

describe("tests re: working with moves", () => {
  before(() => {
    cy.visitAndCheck("/");
    makeIntercepts();
  });

  describe("single pokemon tests", () => {
    before(() => {
      cy.addLocalStorage("single-pokemon-in-team-s-s");
    });

    it("can select a move", () => {
      cy.waitUntil(() => cy.get(getPokemonCard("abra"))).then((abra) => {
        cy.wrap(abra)
          .find(getMoveSlot(0))
          .as("moveSlot")
          .select("body-slam")
          .should("have.value", "body-slam");
      });
    });

    it("can select a custom move", () => {
      cy.addLocalStorage("single-pokemon-in-team-s-s");
      cy.waitUntil(() => cy.get(getPokemonCard("abra"))).then((abra) =>
        cy.wrap(abra).find(getMoveSlot(1)).as("moveSelect").select("_other")
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
  });

  it("move selection works with guidance", () => {
    cy.addLocalStorage("two-pokemon-in-team-with-basic-moves-s-s");
    cy.get(getMiniCard("abra")).find(EXPAND).click();
    cy.get(FOCUS_FRAME).find(SHOW_GUIDANCE).click();
    cy.get(makeDataCy("score-0")).then((score) => {
      cy.get(FOCUS_FRAME).find(getMoveSlot(0)).select("confusion");
      cy.get(makeDataCy("score-0")).should("not.have.text", score.text());
    });
  });

  it("can use custom moves with guidance on", () => {
    cy.addLocalStorage("two-pokemon-in-team-with-custom-moves-s-s");
    cy.get(getMiniCard("abra")).find(EXPAND).click();
    cy.get(FOCUS_FRAME).find(SHOW_GUIDANCE).click();
  });
});

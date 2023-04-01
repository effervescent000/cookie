import {
  EXPAND,
  FOCUS_FRAME,
  getMiniCard,
  getMoveSlot,
  getPokemonCard,
  VERSUS_CARD,
} from "support/constants";
import { makeIntercepts } from "support/utils";

describe("tests re: versus card and its functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    makeIntercepts();
  });

  it("renders nothing when the team is empty", () => {
    cy.addLocalStorage("empty-roster-s-s");
    cy.get(getMiniCard("abra")).find(EXPAND).click();
    cy.waitUntil(() => cy.get(FOCUS_FRAME).as("focusFrame"));
    cy.get("@focusFrame")
      .find(VERSUS_CARD)
      .should("exist")
      .and("not.be.visible");
  });

  it("renders nothing when no team members have moves", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.get(getMiniCard("abra")).find(EXPAND).click();
    cy.waitUntil(() => cy.get(FOCUS_FRAME).as("focusFrame"));
    cy.get("@focusFrame")
      .find(VERSUS_CARD)
      .should("exist")
      .and("not.be.visible");
  });

  it("appears when a pokemon has a move selected", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.waitUntil(() => cy.get(getPokemonCard("abra")).as("abraInTeam"));
    cy.get("@abraInTeam").find(getMoveSlot(0)).select("confusion");

    cy.get(getMiniCard("abra")).find(EXPAND).click();
    cy.waitUntil(() => cy.get(FOCUS_FRAME).as("focusFrame"));
    cy.get("@focusFrame").find(VERSUS_CARD).should("exist").and("be.visible");
  });
});

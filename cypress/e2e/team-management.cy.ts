import { makeDataCy, makeIntercepts } from "support/utils";

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
});

import { makeDataCy } from "support/utils";

describe("smoke tests", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
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
});

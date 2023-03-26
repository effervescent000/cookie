import { makeDataCy } from "support/utils";

describe("smoke tests", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    cy.get("[data-cy='version-VII']").click();
    cy.get("[data-cy='version-sun-moon']").click();
    cy.get(makeDataCy("new-profile")).click();
  });
  it("can add a pokemon to the bench", () => {
    cy.get(makeDataCy("mini-card-abra"))
      .find(makeDataCy("add-to-bench"))
      .click();
    cy.get(makeDataCy("frame-bench")).find(makeDataCy("poke-card-abra"));
  });
});

import { makeDataCy, makeIntercepts } from "support/utils";

describe("functionality re: changing and persisting versions", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    makeIntercepts();
  });

  it("triggers version-group selector when a gen is selected", () => {
    cy.get(makeDataCy("version-1")).click();
    cy.get(makeDataCy("version-red-blue"));
  });

  it("can change versions", () => {
    cy.get(makeDataCy("version-1")).click();
    cy.wait(50);
    cy.get(makeDataCy("version-2")).click();
    cy.get(makeDataCy("version-gold-silver"));
  });

  it("correctly gets the pokemon's type in a modern gen", () => {
    cy.addLocalStorage("empty-roster-s-s");
    cy.get(makeDataCy("mini-card-clefairy"))
      .find(makeDataCy("focus-btn"))
      .click();
    cy.get(makeDataCy("focus-frame"))
      .find(makeDataCy("type-label"))
      .should("have.text", "Fairy");
  });

  it("correctly gets the pokemon's type in previous gens", () => {
    cy.addLocalStorage("empty-roster-g-s");
    cy.get(makeDataCy("mini-card-clefairy"))
      .find(makeDataCy("focus-btn"))
      .click();
    cy.get(makeDataCy("focus-frame"))
      .find(makeDataCy("type-label"))
      .should("have.text", "Normal");
  });
});

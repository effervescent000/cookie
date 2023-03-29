import { makeDataCy } from "support/utils";

describe("functionality re: changing and persisting versions", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
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
});

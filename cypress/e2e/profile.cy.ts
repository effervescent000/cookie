import { makeDataCy } from "support/utils";

describe("Profile functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
  });
  it("can create and persist a profile", () => {
    cy.wait(100);
    cy.get(makeDataCy("new-profile")).click();
    cy.get(makeDataCy("profile-1")).should("exist.and.be.visible");
    cy.get("[data-cy='version-VII']").click();
    cy.get("[data-cy='version-sun-moon']").click();
    cy.wait(100);
    cy.reload();
    cy.get(makeDataCy("profile-1"))
      .should("exist.and.be.visible")
      .and("have.class", "underline");
  });
});

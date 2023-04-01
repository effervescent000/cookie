import { makeDataCy } from "support/utils";

describe("focus frame tests", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
  });

  it("opens and closes focus frame", () => {
    cy.addLocalStorage("empty-roster-s-s");
    cy.get(makeDataCy("mini-card-abra")).as("abra");
    cy.wait(50);
    cy.get("@abra").find(makeDataCy("focus-btn")).click();
    cy.get(makeDataCy("focus-frame"))
      .as("focusFrame")
      .find(makeDataCy("close-focus-btn"))
      .click();
    cy.get("@focusFrame").should("not.exist");
  });
});

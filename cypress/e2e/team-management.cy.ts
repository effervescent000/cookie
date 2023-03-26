import { makeDataCy } from "support/utils";

describe("smoke tests", () => {
  beforeEach(() => {
    cy.fixture("empty-roster-s-s.json").then((data) => {
      localStorage.setItem("activeProfileId", data.activeProfileId);
      localStorage.setItem("profile-1", JSON.stringify(data["profile-1"]));
      localStorage.setItem("profileIdCounter", data.profileIdCounter);
    });
    cy.visitAndCheck("/");
  });
  it("can add a pokemon to the bench and team", () => {
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

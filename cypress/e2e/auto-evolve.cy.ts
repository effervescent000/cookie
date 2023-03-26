import { makeDataCy } from "support/utils";

describe("test easy-evolution feature", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
  });
  it("can evolve a pokemon", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.get(makeDataCy("evolve-btn")).click();
    cy.get(makeDataCy("poke-card-kadabra"));
  });
});

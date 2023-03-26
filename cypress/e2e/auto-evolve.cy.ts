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
  it("persists moves through evolutions", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.get(makeDataCy("poke-card-abra"))
      .find(makeDataCy("move-0"))
      .select("teleport");
    cy.get(makeDataCy("evolve-btn")).click();
    cy.get(makeDataCy("poke-card-kadabra"))
      .find(makeDataCy("move-0"))
      .should("have.value", "teleport");
  });
  it("does not try to evolve a fully-evolved pokemon", () => {
    cy.addLocalStorage("evolved-poke-in-team-s-s");
    cy.get(makeDataCy("evolve-btn")).should("not.exist");
  });

  it("can handle a pokemon that doesn't evolve at all", () => {
    cy.addLocalStorage("no-evolution-poke-in-team-s-s");
    cy.get(makeDataCy("evolve-btn")).should("not.exist");
  });
});

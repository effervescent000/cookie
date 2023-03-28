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

  it("updates a pokemon's stat score when evolving", () => {
    cy.addLocalStorage("single-pokemon-in-team-s-s");
    cy.get(makeDataCy("poke-card-abra"))
      .find(makeDataCy("stat-card"))
      .invoke("text")
      .then((abraStats) => {
        cy.wrap(abraStats).as("abraStats");
        cy.wait(1000);
        cy.get(makeDataCy("evolve-btn")).click();
        cy.wait(100);
        cy.get(makeDataCy("poke-card-kadabra"))
          .find(makeDataCy("stat-card"))
          .invoke("text")
          .then((kadabraStats) => {
            cy.wrap(kadabraStats).as("kadabraStats");
          });
      });
    cy.get("@abraStats").then((abraStats) => {
      cy.get("@kadabraStats").then((kadabraStats) => {
        expect(kadabraStats).to.not.equal(abraStats);
      });
    });
  });
});

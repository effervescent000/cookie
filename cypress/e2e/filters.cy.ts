import { makeDataCy } from "support/utils";

describe("tests for filtering functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
    cy.window().then((window) => {
      window.caches.open("pokecache").then((cache) => {
        cache.delete("https://pokeapi.co/api/v2/pokemon/abra");
      });
    });
    cy.reload();
  });

  it("removes invalid pokemon from results", () => {
    cy.get(makeDataCy("mini-card-abra")).as("abraMini");
    cy.get("@abraMini").find(makeDataCy("query")).click();
    cy.get("@abraMini").should("not.exist");
  });
});

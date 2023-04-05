import { makeDataCy } from "support/utils";

const selectedClass = "border-dark-blue";
const unselectedClass = "border-white";

describe("Profile functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
  });

  it("can create and persist a profile", () => {
    cy.get(makeDataCy("new-profile")).click();
    cy.get(makeDataCy("profile-1")).should("exist.and.be.visible");
    cy.get("[data-cy='version-7']").click();
    cy.get("[data-cy='version-sun-moon']").click();
    cy.wait(100);
    cy.reload();
    cy.get(makeDataCy("profile-1"))
      .should("exist.and.be.visible")
      .and("have.class", selectedClass);
  });

  it("can discern which profile is active", () => {
    cy.get(makeDataCy("new-profile")).click();
    cy.wait(100);
    cy.get(makeDataCy("new-profile")).click();
    cy.get(makeDataCy("profile-1"))
      .should("exist.and.be.visible")
      .and("have.class", "border-white");
    cy.get(makeDataCy("profile-2"))
      .should("exist.and.be.visible")
      .and("have.class", selectedClass);
    cy.reload();
    cy.get(makeDataCy("profile-1"))
      .should("exist.and.be.visible")
      .and("have.class", "border-white");
    cy.get(makeDataCy("profile-2"))
      .should("exist.and.be.visible")
      .and("have.class", selectedClass);
  });

  it("persists deeper profile data", () => {
    const usum = "version-ultra-sun-ultra-moon";
    cy.get(makeDataCy("new-profile")).click();
    cy.get(makeDataCy("version-7")).click();
    cy.get(makeDataCy(usum)).click();
    cy.reload();
    cy.get(makeDataCy(usum)).should("have.class", "underline");
  });

  it("can select a profile", () => {
    cy.get(makeDataCy("new-profile")).click();
    cy.wait(100);
    cy.get(makeDataCy("new-profile")).click();
    cy.get(makeDataCy("profile-1")).click();
    cy.get(makeDataCy("profile-1")).should("have.class", selectedClass);
  });

  it("has a sensible default name and handles multiple profiles", () => {
    const usum = "version-ultra-sun-ultra-moon";
    cy.get(makeDataCy("new-profile")).click();
    cy.get(makeDataCy("profile-1")).should("have.text", "Unnamed profile");
    cy.get(makeDataCy("version-7")).click();
    cy.get(makeDataCy(usum)).click();
    cy.get(makeDataCy("profile-1")).should("have.text", "Ultra Sun Ultra Moon");

    cy.get(makeDataCy("new-profile")).click();
    cy.get(makeDataCy("profile-1"))
      .should("have.text", "Ultra Sun Ultra Moon")
      .and("have.class", unselectedClass);
  });
});

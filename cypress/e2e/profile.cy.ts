import { makeDataCy, parseAllValues } from "support/utils";

describe("Profile functionality", () => {
  beforeEach(() => {
    cy.visitAndCheck("/");
  });
  it("can create and persist a profile", () => {
    cy.get(makeDataCy("new-profile")).click();
    cy.wait(100);
    expect(parseAllValues({ ...localStorage })).to.deep.equal({
      profileIdCounter: 1,
      "profile-0": {
        name: "",
        values: {
          team: [],
          bench: [],
          gen: "",
          versionGroup: "",
          pokemonIdCounter: 0,
        },
      },
      activeProfileId: 0,
    });
  });
});

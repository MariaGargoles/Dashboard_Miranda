describe("IndexPage", () => {
  it("Renders correctly", () => {
    cy.visit("http://localhost:5173/");
  });
});

describe("NO Login test", () => {
  it("successfully loads with correct credentials", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#username").type("NovalidName");
    cy.get("#password").type("Nopassword");
    cy.get(".FormButton").click();
    cy.url().should("equal", "http://localhost:5173/");
  });
});

describe("Login test", () => {
  it("successfully loads with correct credentials", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#username").type("maria");
    cy.get("#password").type("miranda");
    cy.get(".FormButton").click();
    cy.url().should("equal", "http://localhost:5173/");
  });
});

describe("IndexPage", () => {
  it("Renders correctly", () => {
    cy.visit("http://localhost:5173/");
    cy.contains("I'm the loading page!");
  });
});

describe("Login test", () => {
  it("successfully loads with correct credentials", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#username").type("maria");
    cy.get("#password").type("miranda");
    cy.get("button").click();
    cy.url().should("equal", "http://localhost:5173/");
  });
});

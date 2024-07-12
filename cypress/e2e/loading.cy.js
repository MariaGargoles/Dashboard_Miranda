describe("IndexPage", () => {
  it("Renders correctly", () => {
    cy.visit("http://localhost:5173/");
  });
});

describe("NO Login test", () => {
  it("unsuccessfully loads with correct credentials", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#username").type("NovalidName");
    cy.get("#password").type("Nopassword");
    cy.get(".FormButton").click();
    cy.url().should("equal", "http://localhost:5173/");
  });
});

describe("Login test and navigate", () => {
  it("successfully loads with correct credentials", () => {
    cy.visit("http://localhost:5173/");
    cy.get("#username").type("maria");
    cy.wait(500);
    cy.get("#password").type("miranda");
    cy.wait(500);
    cy.get(".FormButton").click();
    cy.url().should("equal", "http://localhost:5173/");

    //Desplegar el menu y mantenerlo 5s
    cy.get(".displaymenu").click();
    cy.get(".menutoggle").should("be.visible");
    cy.wait(500);

    //Entrar al dashboard
    cy.get(".dashboardlink").click();
    cy.url().should("include", "/dashboard");

    //Entrar a las rooms
    cy.get(".roomslink").click();
    cy.url().should("include", "/rooms");
    cy.get(".displaymenu").click();
    cy.get(".menutoggle").should("be.visible");
    cy.wait(500);

    //Entrar a booking
    cy.get(".bookinlink").click();
    cy.url().should("include", "/booking");
    cy.get(".displaymenu").click();
    cy.get(".menutoggle").should("be.visible");
    cy.wait(500);
  });
});

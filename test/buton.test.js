import "jest-environment-jsdom";
import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { UsersButton } from "../src/components/UsersComponent/UsersStyled";

describe("Boton en verde", () => {
  test("button should have background color #E8FFEE", () => {
    render(<UsersButton status="ACTIVE"> Button </UsersButton>);
    expect(screen.getByRole("button", { name: /Button/i })).toHaveStyle({
      backgroundColor: "#E8FFEE",
    });
  });
});

describe("Boton en rojo", () => {
  test("button should have background color #FFEDEC", () => {
    render(<UsersButton status="!ACTIVE"> Button </UsersButton>);
    expect(screen.getByRole("button", { name: /Button/i })).toHaveStyle({
      backgroundColor: "#FFEDEC",
    });
  });
});

import "@testing-library/jest-dom/vitest";

import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { describe, it, expect } from "vitest";
import { HeaderComponent } from ".";

describe("<HeaderComponent />", () => {
  it("Should render correctly", () => {
    render(
      <BrowserRouter>
        <HeaderComponent />
      </BrowserRouter>
    );

    const logo = screen.getByAltText("Logo");

    expect(logo).toBeVisible();
  });

  it("Should render wishlist button", () => {
    render(
      <BrowserRouter>
        <HeaderComponent />
      </BrowserRouter>
    );

    const wishlistButton = screen.getByText("Wishlist");

    expect(wishlistButton).toBeInTheDocument();
  });

  it("Should have the correct links", () => {
    render(
      <BrowserRouter>
        <HeaderComponent />
      </BrowserRouter>
    );

    const homeLink = screen.getByRole("link", { name: /logo/i });
    const wishlistLink = screen.getByRole("link", { name: /wishlist/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(wishlistLink).toHaveAttribute("href", "/wishlist");
  });
});

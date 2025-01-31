import { Heart } from "lucide-react";

import Logo from "../../assets/logo.svg";

import "./styles.css";

export const HeaderComponent = () => {
  return (
    <header className="container-header">
      <a href="/">
        <img src={Logo} className="logo" alt="Logo" />
      </a>

      <a href="/wishlist" className="button-wishlist">
        <Heart />
        Wishlist
      </a>
    </header>
  );
};

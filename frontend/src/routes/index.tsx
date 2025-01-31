import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/home";
import { WishlistPage } from "../pages/wishlist";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
      </Routes>
    </BrowserRouter>
  );
};

import RootLayout from "@/shared/components/layout/RootLayout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WalletPage from "./pages/WalletPage";
import SwapPage from "./pages/SwapPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/swap" element={<SwapPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

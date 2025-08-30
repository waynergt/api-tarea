import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ExpedientesPage from "../pages/ExpedientesPage";
import IndiciosPage from "../pages/IndiciosPage";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";
import RedirectToLogin from "./RedirectToLogin";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToLogin />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Layout />}>
          <Route path="expedientes" element={<ExpedientesPage />} />
          <Route path="expedientes/:id/indicios" element={<IndiciosPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
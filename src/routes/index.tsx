import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ExpedientesPage from "../pages/ExpedientesPage";
import IndiciosPage from "../pages/IndiciosPage";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login fuera del Layout */}
        <Route path="/login" element={<LoginPage />} />
        {/* Todas las rutas protegidas, con Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/expedientes" />} />
          <Route path="expedientes" element={<ExpedientesPage />} />
          <Route path="expedientes/:id/indicios" element={<IndiciosPage />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
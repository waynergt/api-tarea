import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import InicioPage from "../pages/InicioPage";
import ExpedientesPage from "../pages/ExpedientesPage";
import IndiciosPage from "../pages/IndiciosPage";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta raíz redirige a login */}
        <Route path="/" element={<LoginPage />} />
        {/* Opción para acceder directamente al login */}
        <Route path="/login" element={<LoginPage />} />
        {/* Rutas protegidas dentro del layout */}
        <Route path="/" element={<Layout />}>
          <Route path="inicio" element={<InicioPage />} />
          <Route path="expedientes" element={<ExpedientesPage />} />
          <Route path="expedientes/:id/indicios" element={<IndiciosPage />} />
        </Route>
        {/* Página para rutas no encontradas */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
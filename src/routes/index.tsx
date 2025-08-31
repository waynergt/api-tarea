import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import InicioPage from "../pages/InicioPage";
import ExpedientesPage from "../pages/ExpedientesPage";
import IndiciosPage from "../pages/IndiciosPage";
import IndiciosPageGeneral from "../pages/IndiciosPageGeneral";
import UsuariosPage from "../pages/UsuariosPage";
import NotFound from "../pages/NotFound";
import Layout from "../components/Layout";
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="inicio" element={<InicioPage />} />
            <Route path="expedientes" element={<ExpedientesPage />} />
            <Route path="expedientes/:id/indicios" element={<IndiciosPage />} />
            <Route path="indicios" element={<IndiciosPageGeneral />} />
            <Route path="usuarios" element={<UsuariosPage />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
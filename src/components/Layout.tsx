import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { FiHome, FiFolder, FiLogOut } from "react-icons/fi"; // Iconos de react-icons

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();

  // Función para cerrar sesión
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* NAVBAR */}
      <nav className="bg-primary text-white shadow-lg sticky top-0 z-50 w-full">
        <div className="max-w-4xl mx-auto flex items-center justify-between px-4 py-4">
          <span className="font-bold text-2xl tracking-wide flex items-center gap-2">
            <FiFolder className="text-accent" /> Evidencias
          </span>
          <div className="flex gap-4 sm:gap-6 items-center">
            <Link
              to="/inicio"
              className={`flex items-center gap-1 hover:text-accent transition font-semibold ${
                location.pathname === "/inicio" ? "text-accent underline" : ""
              }`}
            >
              <FiHome /> Inicio
            </Link>
            <Link
              to="/expedientes"
              className={`flex items-center gap-1 hover:text-accent transition font-semibold ${
                location.pathname.startsWith("/expedientes") ? "text-accent underline" : ""
              }`}
            >
              <FiFolder /> Expedientes
            </Link>
            <button
              onClick={handleLogout}
              className="ml-2 flex items-center gap-1 bg-accent hover:bg-accent/80 text-white font-semibold px-3 py-2 rounded transition"
            >
              <FiLogOut /> Cerrar sesión
            </button>
          </div>
        </div>
      </nav>
      {/* MAIN */}
      <main className="flex-1 flex items-center justify-center px-2">
        <div className="w-full max-w-4xl mx-auto">
          <Outlet />
        </div>
      </main>
      {/* FOOTER */}
      <footer className="bg-surface border-t w-full">
        <div className="max-w-4xl mx-auto text-center py-3 text-gray-500 text-sm">
          Wayner López © 2025
        </div>
      </footer>
    </div>
  );
}
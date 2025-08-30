import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <nav className="bg-primary text-white px-8 py-4 flex items-center justify-between shadow-lg sticky top-0 z-50">
        <div className="font-bold text-2xl tracking-wide">Evidencias DICRI</div>
        <div className="space-x-8">
          <Link
            to="/expedientes"
            className={`hover:text-accent transition font-semibold ${location.pathname.startsWith("/expedientes") ? "text-accent underline" : ""}`}
          >
            Expedientes
          </Link>
        </div>
        {/* Aquí puedes poner logout/avatar si tienes auth */}
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
      <footer className="bg-surface text-center py-3 text-gray-500 text-sm border-t">
        DICRI © 2025
      </footer>
    </div>
  );
}
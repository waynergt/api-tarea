import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaFolderOpen, FaFingerprint, FaUsers } from "react-icons/fa";
import api from "../api/axios";

export default function InicioPage() {
  const [conteo, setConteo] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró el token de autenticación.");
      return;
    }

    api.get("/expedientes", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => setConteo(res.data.expedientes.length))
      .catch((err) => {
        setConteo(null);
        setError("No se pudo cargar la información de expedientes.");
        // Opcional: log real del error para depuración
        console.error("Error al obtener expedientes:", err);
      });
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-2">
      <div className="w-full max-w-lg bg-surface/90 rounded-2xl border border-muted shadow-2xl p-4 sm:p-8 mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 text-center drop-shadow-lg">¡Bienvenido!</h1>
        <p className="text-lg text-secondary text-center mb-2 max-w-lg">
          Has iniciado sesión correctamente.<br />
          Desde aquí puedes navegar a los diferentes módulos del sistema.
        </p>
        {error && (
          <div className="text-red-600 mb-4 text-center">{error}</div>
        )}
        <p className="text-accent font-bold mb-6 text-center text-lg sm:text-xl">
          {conteo !== null && !error
            ? `Actualmente hay ${conteo} expedientes registrados`
            : !error && "Cargando información..."}
        </p>
        <div className="w-full flex flex-col sm:flex-row gap-6 justify-center mb-4">
          <Link
            to="/expedientes"
            className="flex-1 flex flex-col items-center bg-primary/90 hover:bg-accent text-white p-6 rounded-xl shadow-lg transition-all w-full"
          >
            <FaFolderOpen size={40} className="mb-2" />
            <span className="font-bold text-lg">Expedientes</span>
            <span className="text-sm text-white/70">Ver y gestionar</span>
          </Link>
          <button
            disabled
            className="flex-1 flex flex-col items-center bg-muted text-muted-foreground p-6 rounded-xl shadow-lg w-full opacity-70 cursor-not-allowed"
          >
            <FaFingerprint size={40} className="mb-2" />
            <span className="font-bold text-lg">Indicios</span>
            <span className="text-sm">Próximamente</span>
          </button>
          <button
            disabled
            className="flex-1 flex flex-col items-center bg-muted text-muted-foreground p-6 rounded-xl shadow-lg w-full opacity-70 cursor-not-allowed"
          >
            <FaUsers size={40} className="mb-2" />
            <span className="font-bold text-lg">Usuarios</span>
            <span className="text-sm">Próximamente</span>
          </button>
        </div>
      </div>
    </div>
  );
}
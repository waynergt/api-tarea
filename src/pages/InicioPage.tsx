import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";
import { FiFolder, FiUsers, FiActivity } from "react-icons/fi";

function Card({
  title,
  description,
  icon,
  active,
  to,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  active?: boolean;
  to?: string;
}) {
  const content = (
    <div
      className={`flex flex-col items-center bg-primary/80 rounded-xl p-6 m-2 shadow-lg w-40 transition border ${
        active
          ? "border-accent shadow-accent/30 cursor-pointer hover:scale-105"
          : "border-surface opacity-60"
      }`}
    >
      <div className="mb-2 text-3xl text-accent">{icon}</div>
      <div className={`font-bold ${active ? "text-accent" : "text-white"}`}>
        {title}
      </div>
      <div className="text-xs text-gray-400">{description}</div>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

export default function InicioPage() {
  const [conteo, setConteo] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("No se encontró el token de autenticación.");
      setLoading(false);
      return;
    }
    api
      .get("/expedientes", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setConteo(res.data.expedientes.length))
      .catch(() =>
        setError("No se pudo cargar la información de expedientes.")
      )
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full max-w-3xl bg-surface/90 rounded-2xl border border-muted shadow-2xl p-4 sm:p-8 mx-auto flex flex-col items-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold text-primary mb-4 text-center drop-shadow-lg">
        ¡Bienvenido!
      </h1>
      <p className="text-lg text-secondary text-center mb-2 max-w-lg">
        Has iniciado sesión correctamente.
        <br />
        Desde aquí puedes navegar a los diferentes módulos del sistema.
      </p>
      {loading && (
        <p className="text-accent font-bold mb-6 text-center">
          Cargando información...
        </p>
      )}
      {error && (
        <p className="text-red-500 font-bold mb-6 text-center">{error}</p>
      )}
      {conteo !== null && !loading && !error && (
        <p className="text-accent font-bold mb-6 text-center text-lg sm:text-xl">
          Actualmente hay {conteo} expedientes registrados
        </p>
      )}
      <div className="flex flex-wrap justify-center mt-4">
        <Card
          title="Expedientes"
          description="Ver y gestionar"
          icon={<FiFolder />}
          active
          to="/expedientes"
        />
        <Card
          title="Indicios"
          description="Ver y gestionar"
          icon={<FiActivity />}
          active
          to="/indicios"
        />
        <Card
          title="Usuarios"
          description="Ver y gestionar"
          icon={<FiUsers />}
          active
          to="/usuarios"
        />
      </div>
    </div>
  );
}
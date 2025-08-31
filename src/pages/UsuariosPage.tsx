import { useEffect, useState } from "react";
import api from "../api/axios";
import { FiUser, FiMail, FiCheckCircle } from "react-icons/fi";

type Usuario = {
  id: number;
  nombre: string;
  correo: string;
  activo: boolean;
};

export default function UsuariosPage() {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    api
      .get("http://localhost:3000/api/usuarios", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
      console.log("Respuesta de usuarios:", res.data);
      setUsuarios(res.data.usuarios); // Ajusta aquí si tu API responde diferente
    })
      .catch((err) => {
      console.error("Error al cargar usuarios:", err);
      setError("No se pudieron cargar los usuarios");
    })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto bg-surface/90 rounded-2xl border border-muted shadow-2xl p-6 mt-8">
      <h2 className="text-3xl font-bold text-primary flex items-center gap-2 mb-6">
        <FiUser className="text-accent" /> Usuarios
      </h2>
      {loading ? (
        <div className="text-accent text-center py-10 font-bold">Cargando usuarios...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-10 font-bold">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr className="bg-primary text-white">
                <th className="py-3 px-4 rounded-tl-lg">Nombre</th>
                <th className="py-3 px-4">Correo</th>
                <th className="py-3 px-4">Estado</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr
                  key={usuario.id}
                  className="border-b border-muted hover:bg-background/60 transition"
                >
                  <td className="py-3 px-4 flex items-center gap-2">
                    <FiUser className="text-accent" /> {usuario.nombre}
                  </td>
                  <td className="py-3 px-4 flex items-center gap-2">
                    <FiMail className="text-secondary" /> {usuario.correo}
                  </td>
                  <td className="py-3 px-4">
                    {usuario.activo ? (
                      <span className="flex items-center gap-1 text-green-500 font-semibold">
                        <FiCheckCircle /> Activo
                      </span>
                    ) : (
                      <span className="text-gray-400 font-semibold">Inactivo</span>
                    )}
                  </td>
                </tr>
              ))}
              {usuarios.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-400">
                    No hay usuarios registrados.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
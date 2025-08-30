import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router-dom";

type Expediente = {
  expediente_id: number;
  codigo: string;
  descripcion: string;
  estado: string;
  activo: boolean;
};

export default function ExpedientesPage() {
  const [expedientes, setExpedientes] = useState<Expediente[]>([]);

  useEffect(() => {
    api
      .get("/expedientes", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setExpedientes(res.data.expedientes));
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-primary">Expedientes</h1>
        <Link
          to="/expedientes/nuevo"
          className="bg-accent text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-secondary transition"
        >
          + Nuevo expediente
        </Link>
      </div>
      <div className="bg-surface rounded-xl shadow-lg p-6">
        {expedientes.length === 0 ? (
          <div className="text-center text-gray-400 py-12 text-xl">No hay expedientes</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="text-left text-secondary border-b">
                <th className="py-2">Código</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {expedientes.map((exp) => (
                <tr key={exp.expediente_id} className="border-t hover:bg-muted/50 transition">
                  <td className="py-2 font-bold">{exp.codigo}</td>
                  <td>{exp.descripcion}</td>
                  <td>
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                      exp.estado === "aprobado"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}>
                      {exp.estado}
                    </span>
                  </td>
                  <td>
                    <Link
                      to={`/expedientes/${exp.expediente_id}/indicios`}
                      className="text-accent font-bold hover:underline"
                    >
                      Ver Indicios
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
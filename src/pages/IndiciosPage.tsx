import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams } from "react-router-dom";

type Indicio = {
  indicio_id: number;
  codigo: string;
  descripcion: string;
  peso: number;
  color: string;
  tamano: string;
  activo: boolean;
};

export default function IndiciosPage() {
  const { id } = useParams<{ id: string }>();
  const [indicios, setIndicios] = useState<Indicio[]>([]);
  const [nuevo, setNuevo] = useState({ codigo: "", descripcion: "", peso: 0, color: "", tamano: "" });

  useEffect(() => {
    api
      .get(`/expedientes/${id}/indicios`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setIndicios(res.data.indicios));
  }, [id]);

  const crearIndicio = async () => {
    await api.post(
      `/expedientes/${id}/indicios`,
      nuevo,
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setNuevo({ codigo: "", descripcion: "", peso: 0, color: "", tamano: "" });
    // recarga lista
    const res = await api.get(`/expedientes/${id}/indicios`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setIndicios(res.data.indicios);
  };

  const eliminarIndicio = async (indicio_id: number) => {
    await api.patch(
      `/indicios/${indicio_id}/activo`,
      { activo: 0 },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    );
    setIndicios(indicios.filter(i => i.indicio_id !== indicio_id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-primary mb-6">Indicios del Expediente #{id}</h2>
      <div className="bg-white shadow rounded p-4 mb-6">
        <h3 className="font-semibold mb-2">Agregar Indicio</h3>
        <div className="flex space-x-2 mb-2">
          <input className="border p-2 rounded w-32" placeholder="Código" value={nuevo.codigo} onChange={e => setNuevo(n => ({ ...n, codigo: e.target.value }))} />
          <input className="border p-2 rounded w-40" placeholder="Descripción" value={nuevo.descripcion} onChange={e => setNuevo(n => ({ ...n, descripcion: e.target.value }))} />
          <input className="border p-2 rounded w-24" type="number" placeholder="Peso" value={nuevo.peso} onChange={e => setNuevo(n => ({ ...n, peso: parseFloat(e.target.value) }))} />
          <input className="border p-2 rounded w-24" placeholder="Color" value={nuevo.color} onChange={e => setNuevo(n => ({ ...n, color: e.target.value }))} />
          <input className="border p-2 rounded w-24" placeholder="Tamaño" value={nuevo.tamano} onChange={e => setNuevo(n => ({ ...n, tamano: e.target.value }))} />
          <button onClick={crearIndicio} className="bg-primary text-white px-4 rounded hover:bg-accent">Agregar</button>
        </div>
      </div>
      <div className="bg-white rounded shadow p-4">
        <table className="w-full">
          <thead>
            <tr className="text-primary">
              <th>Código</th>
              <th>Descripción</th>
              <th>Peso</th>
              <th>Color</th>
              <th>Tamaño</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {indicios.map((ind) => (
              <tr key={ind.indicio_id} className="border-t">
                <td>{ind.codigo}</td>
                <td>{ind.descripcion}</td>
                <td>{ind.peso}</td>
                <td>{ind.color}</td>
                <td>{ind.tamano}</td>
                <td>
                  <button
                    onClick={() => eliminarIndicio(ind.indicio_id)}
                    className="text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                  {/* Puedes agregar edición aquí */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
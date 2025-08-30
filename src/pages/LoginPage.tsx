import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { usuario, password });
      localStorage.setItem("token", res.data.token);
      navigate("/expedientes");
    } catch {
      setError("Usuario o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-gradient-to-br from-primary via-secondary to-accent animate-gradient px-2">
      <form
        onSubmit={handleSubmit}
        className="bg-surface shadow-2xl rounded-2xl px-8 py-10 w-full max-w-md border border-muted flex flex-col"
      >
        <div className="flex flex-col items-center mb-8">
          <span className="text-4xl font-extrabold text-primary mb-2">BIENVENIDO</span>
          <span className="text-lg text-secondary font-semibold">Ingrese sus credenciales</span>
        </div>
        {error && <div className="text-red-600 mb-4 text-center">{error}</div>}
        <div className="mb-6">
          <label className="block text-secondary font-semibold mb-2">Usuario</label>
          <input
            className="w-full p-3 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition"
            type="text"
            placeholder="Usuario"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            autoFocus
            required
          />
        </div>
        <div className="mb-8">
          <label className="block text-secondary font-semibold mb-2">Contraseña</label>
          <input
            className="w-full p-3 border border-muted rounded-xl focus:outline-none focus:ring-2 focus:ring-accent transition"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          className="w-full bg-primary text-white py-3 rounded-xl font-bold text-lg hover:bg-accent shadow transition flex items-center justify-center"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-6 w-6 mr-2 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
          ) : null}
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
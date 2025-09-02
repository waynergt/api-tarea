import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validateEmail(email)) {
      setError("Por favor ingresa un correo válido.");
      return;
    }
    if (!password) {
      setError("La contraseña es obligatoria.");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email, password });
      
      if (!res.data.ok || !res.data.token || !res.data.usuario) {
        throw new Error("Respuesta inválida del servidor");
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userRole", res.data.usuario.rol);
      console.log("Login exitoso:", { 
        token: res.data.token, 
        rol: res.data.usuario.rol,
        usuario: res.data.usuario 
      });
      
      navigate("/inicio", { replace: true });
    } catch {
      setError("Correo o contraseña incorrectos");
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
          <h2 className="text-2xl font-bold mb-2 text-accent">Iniciar sesión</h2>
        </div>
        {error && (
          <div className="mb-4 text-red-500 text-center">{error}</div>
        )}
        <input
          type="email"
          placeholder="Correo electrónico"
          className="mb-4 px-4 py-2 rounded border border-muted bg-background text-white"
          value={email}
          onChange={e => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="mb-6 px-4 py-2 rounded border border-muted bg-background text-white"
          value={password}
          onChange={e => setPassword(e.target.value)}
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-accent hover:bg-accent/80 text-white font-semibold px-4 py-2 rounded transition"
          disabled={loading}
        >
          {loading ? "Ingresando..." : "Ingresar"}
        </button>
      </form>
    </div>
  );
}
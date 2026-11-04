// src/pages/LoginAdmin.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginAdmin() {
  const { loginAdmin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

const currentUserType =
  localStorage.getItem("userType");

if (
  currentUserType &&
  currentUserType !== "admin"
) {

  const continuar = window.confirm(
    "Existe una sesión de cliente activa. ¿Desea reemplazarla?"
  );

  if (!continuar) {
    return;
  }

  localStorage.clear();
}

  const success = await loginAdmin(
    email,
    password
  );

  if (success) {
    navigate("/admin/dashboard");
  }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Login Admin</h2>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-80"
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

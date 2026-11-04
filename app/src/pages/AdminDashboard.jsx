// src/pages/AdminDashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

export default function AdminDashboard() {
  const { user, token, logout } = useContext(AuthContext);
  const [metricas, setMetricas] = useState(null);

  useEffect(() => {
    const fetchMetricas = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/admin/metricas", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMetricas(res.data);
      } catch (error) {
        console.error("Error al cargar métricas:", error.response?.data || error.message);
      }
    };
    if (token) fetchMetricas();
  }, [token]);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Admin</h1>
      <div className="bg-white shadow-md rounded p-6 w-96 mb-6">
        <p className="mb-2"><strong>Nombre:</strong> {user.nombre}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Rol:</strong> {user.rol}</p> {/* 👈 mostramos el rol */}
      </div>

      <div className="bg-white shadow-md rounded p-6 w-96 mb-6">
        <h2 className="text-xl font-semibold mb-4">Métricas</h2>
        {metricas ? (
          <ul className="space-y-2">
            <li><strong>Usuarios registrados:</strong> {metricas.usuariosRegistrados}</li>
            <li><strong>Ventas totales:</strong> {metricas.ventasTotales}</li>
            <li><strong>Productos activos:</strong> {metricas.productosActivos}</li>
          </ul>
        ) : (
          <p className="text-gray-600">Cargando métricas...</p>
        )}
      </div>

      {/* 🔒 Secciones según rol */}
      {user.rol === "superadmin" && (
        <div className="bg-white shadow-md rounded p-6 w-96 mb-6">
          <h2 className="text-xl font-semibold mb-4">Gestión de Administradores</h2>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Crear nuevo admin
          </button>
        </div>
      )}

      {user.rol === "editor" && (
        <div className="bg-white shadow-md rounded p-6 w-96 mb-6">
          <h2 className="text-xl font-semibold mb-4">Gestión de Productos</h2>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Editar productos
          </button>
        </div>
      )}

      {user.rol === "viewer" && (
        <div className="bg-white shadow-md rounded p-6 w-96 mb-6">
          <h2 className="text-xl font-semibold mb-4">Acceso limitado</h2>
          <p className="text-gray-600">Solo puedes visualizar métricas.</p>
        </div>
      )}

      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Cerrar sesión
      </button>
    </div>
  );
}


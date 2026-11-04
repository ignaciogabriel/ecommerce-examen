// src/pages/ConfiguracionAdmin.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ConfiguracionAdmin() {

    console.log("CONFIGURACION ADMIN RENDERIZADA");
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Configuración de Administradores</h1>

      <div className="bg-white shadow-md rounded p-6 w-96 mb-6">
        <p className="mb-2"><strong>Nombre:</strong> {user.nombre}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Rol:</strong> {user.rol}</p>
      </div>

      <div className="bg-white shadow-md rounded p-6 w-96">
        <h2 className="text-xl font-semibold mb-4">Gestión de Administradores</h2>
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-2">
          Crear nuevo admin
        </button>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mb-2">
          Editar admin existente
        </button>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
          Eliminar admin
        </button>
      </div>
    </div>
  );
}

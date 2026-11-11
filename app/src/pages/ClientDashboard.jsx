// src/pages/ClientDashboard.jsx
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ClientDashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  console.log(user);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Cliente</h1>
      <div className="bg-white shadow-md rounded p-6 w-96">
        <p className="mb-2"><strong>Nombre:</strong> {user.nombre}</p>
        <p className="mb-2"><strong>Email:</strong> {user.email}</p>
        <p className="mb-2"><strong>Dirección:</strong> {user.direccion}</p>
        <p className="mb-2"><strong>Teléfono:</strong> {user.telefono}</p>
      </div>
   
    </div>
  );
}

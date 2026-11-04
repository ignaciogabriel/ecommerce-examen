// src/pages/Home.jsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Bienvenido al Ecommerce</h1>
      <div className="space-x-4">
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login Cliente
        </Link>
        <Link
          to="/admin/login"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Login Admin
        </Link>
      </div>
    </div>
  );
}

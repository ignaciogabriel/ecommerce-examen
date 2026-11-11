import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function RegisterClient() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    password: "",
    direccion: "",
    telefono: ""
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        "http://localhost:3000/api/client/register",
        formData
      );

      alert("Cliente registrado correctamente");

      navigate("/login");

    } catch (error) {

      console.error(error);

      alert("Error al registrar cliente");

    }

  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">

        <h1 className="text-3xl font-bold text-violet-700 mb-6 text-center">
          Crear Cuenta
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="text"
            name="direccion"
            placeholder="Dirección"
            value={formData.direccion}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            type="text"
            name="telefono"
            placeholder="Teléfono"
            value={formData.telefono}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-3 rounded hover:bg-violet-700"
          >
            Registrarse
          </button>

        </form>

        <p className="text-center mt-4">

          ¿Ya tienes cuenta?{" "}

          <Link
            to="/login"
            className="text-violet-600 font-semibold"
          >
            Inicia sesión
          </Link>

        </p>

      </div>

    </div>

  );

}
// app/src/components/Header.jsx

import { useContext } from "react";

import {
  AuthContext
} from "../context/AuthContext";

import {
  ThemeContext
} from "../context/ThemeContext";

import { useState } from "react";
import { Link } from "react-router-dom";


export default function Header() {

      const [menuOpen, setMenuOpen] = useState(false);

  const {
    user,
    userType,
    logout
  } = useContext(AuthContext);

  const {
    theme,
    toggleTheme
  } = useContext(ThemeContext);

  return (
    <header className="bg-violet-700 text-white p-4 flex justify-between items-center">

      <h1 className="font-bold text-xl">
        TechStore
      </h1>

            {/* Navbar */}
      <nav className="bg-violet-700 text-white p-4">

        <div className="flex justify-center items-center">

         

          {/* Mobile */}
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

          {/* Desktop */}
          <div className="hidden md:flex gap-4">
            <Link to="/">Inicio</Link>
            <Link to="/products">Productos</Link>
            <Link to="/login">Login</Link>
            
          </div>
        </div>

        {menuOpen && (
          <div className="flex flex-col mt-4 gap-2 md:hidden">
            <Link to="/">Inicio</Link>
            <Link to="/products">Productos</Link>
            <Link to="/login">Cliente</Link>
            
          </div>
        )}

      </nav>

      <div className="flex gap-4 items-center">

        <button
          onClick={toggleTheme}
          className="bg-white text-violet-700 px-3 py-1 rounded"
        >
          {theme === "light"
            ? "🌙 Dark"
            : "☀️ Light"}
        </button>

        {user && (
          <>
            <span>
              {user.nombre}
            </span>

            <span>
              ({userType})
            </span>

            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded"
            >
              Salir
            </button>
          </>
        )}

      </div>

    </header>
  );
}
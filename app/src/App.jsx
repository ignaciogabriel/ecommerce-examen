// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import LoginClient from "./pages/LoginClient";
import LoginAdmin from "./pages/LoginAdmin";
import ClientDashboard from "./pages/ClientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ClientRoute from "./components/ClientRoute";
import AdminRoute from "./components/AdminRoute";
import RoleRoute from "./components/RoleRoute";
import ConfiguracionAdmin from "./pages/ConfiguracionAdmin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página pública */}
        <Route path="/" element={<Home />} />

        {/* Login Cliente */}
        <Route path="/login" element={<LoginClient />} />

        {/* Login Admin */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* Rutas protegidas */}
        <Route
          path="/cliente/dashboard"
          element={
            <ClientRoute>
              <ClientDashboard />
            </ClientRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

         {/* Rutas protegidas por rol */}
        <Route
          path="/admin/configuracion"
          element={
            <RoleRoute allowedRoles={["superadmin"]}>
              <ConfiguracionAdmin />
            </RoleRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

// src/pages/AdminDashboard.jsx
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import {
  Pencil,
  Trash2
} from "lucide-react";

export default function AdminDashboard() {
  const { user, token, logout } = useContext(AuthContext);
  const [metricas, setMetricas] = useState(null);
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imageUrl: ""
  });

  const [showForm, setShowForm] =
  useState(false);

  const [productSearch, setProductSearch] =
  useState("");

  const [editingProduct, setEditingProduct] =
    useState(null);
  const [activeSection, setActiveSection] =
    useState("perfil");

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;
  const indexOfLastProduct =
  currentPage * productsPerPage;

  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts =
    products
      .filter((product) =>
        product.name
          .toLowerCase()
          .includes(
            productSearch.toLowerCase()
          )
      )
      .slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
    
  const totalPages = Math.ceil(
    products
      .filter((product) =>
        product.name
          .toLowerCase()
          .includes(
            productSearch.toLowerCase()
          )
      ).length
      / productsPerPage
  );


  const createProduct = async (e) => {
    e.preventDefault();
  
    try {
    
      await axios.post(
        "http://localhost:3000/api/products",
        newProduct
      );
    
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: ""
      });
    
      setShowForm(false);
    
      await fetchProducts();
    
    } catch (error) {
    
      console.error(
        "Error creando producto",
        error
      );
    
    }
  };
  
  
  const updateProduct = async (e) => {
    e.preventDefault();
  
    try {
    
      await axios.put(
        `http://localhost:3000/api/products/${editingProduct}`,
        newProduct
      );
    
      setEditingProduct(null);
      setShowForm(false);
    
      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: ""
      });
    
      await fetchProducts();
    
    } catch (error) {
    
      console.error(
        "Error actualizando producto",
        error
      );
    
    }
  };
  
  
  const deleteProduct = async (id) => {

  const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) return;

    try {

      await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );

      await fetchProducts();

    } catch (error) {

      console.error(
        "Error eliminando producto",
        error
      );

    }

  };

  const fetchProducts = async () => {
    try {
    
      const res = await axios.get(
        "http://localhost:3000/api/products"
      );
    
      setProducts(res.data.products);
    
    } catch (error) {
    
      console.error(
        "Error cargando productos",
        error
      );
    
    }
  };

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

    if (token) {

      fetchMetricas();
      fetchProducts();
    }
  }, [token]);

  

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Cargando perfil...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex">

  {/* Sidebar */}
  <div className="w-64 bg-gray-700 text-white p-6">

    <h2 className="text-2xl font-bold mb-8">
      Panel Admin
    </h2>

  <div className="flex flex-col gap-3">

    <button
      onClick={() => setActiveSection("perfil")}
      className="text-left p-3 rounded hover:bg-violet-600"
    >
      Perfil
    </button>

    <button
      onClick={() => setActiveSection("metricas")}
      className="text-left p-3 rounded hover:bg-violet-600"
    >
     Métricas
    </button>

   <button
      onClick={() => setActiveSection("productos")}
      className="text-left p-3 rounded hover:bg-violet-600"
    >
       Productos
    </button>

  </div>

</div>

<div className="flex-1 p-8">

      
{activeSection === "perfil" && (

  <div className="bg-white shadow-md rounded p-6 max-w-xl">

    <h2 className="text-2xl font-bold text-violet-700 mb-4">
      Perfil
    </h2>

    <p className="mb-2">
      <strong>Nombre:</strong> {user.nombre}
    </p>

    <p className="mb-2">
      <strong>Email:</strong> {user.email}
    </p>

    <p className="mb-2">
      <strong>Rol:</strong> {user.rol}
    </p>


          {/* Secciones según rol */}
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

  </div>

  

)}

     {activeSection === "metricas" && (

  <div className="bg-white shadow-md rounded p-6 max-w-xl">

    <h2 className="text-2xl font-bold text-violet-700 mb-4">
      Métricas
    </h2>

    {metricas ? (

      <ul className="space-y-2">

        <li>
          <strong>Usuarios registrados:</strong>{" "}
          {metricas.usuariosRegistrados}
        </li>

        <li>
          <strong>Ventas totales:</strong>{" "}
          {metricas.ventasTotales}
        </li>

        <li>
          <strong>Productos activos:</strong>{" "}
          {metricas.productosActivos}
        </li>

      </ul>

    ) : (

      <p className="text-gray-600">
        Cargando métricas...
      </p>

    )}

  </div>

)}


{activeSection === "productos" && (
  <>

  <div className="bg-white shadow-md rounded p-6 w-full max-w-5xl mb-6">

  <div className="flex gap-2 items-center mb-4">

  <h2 className="text-2xl font-bold text-violet-700">
    Gestión de Productos
  </h2>

  <button
    onClick={() => setShowForm(!showForm)}
    className="
      w-10
      h-10
      rounded-2xl
      bg-violet-600
      text-white
      text-2xl
      
      hover:bg-violet-700
      transition
    "
  >
    +
  </button>

</div>
  {showForm && (

  <form
    onSubmit={
      editingProduct
        ? updateProduct
        : createProduct
    }
    className="grid grid-cols-1 md:grid-cols-2 gap-4"
  >

    <input
      type="text"
      placeholder="Nombre"
      value={newProduct.name}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          name: e.target.value
        })
      }
      className="border p-2 rounded"
    />

    <input
      type="text"
      placeholder="Categoría"
      value={newProduct.category}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          category: e.target.value
        })
      }
      className="border p-2 rounded"
    />

    <input
      type="number"
      placeholder="Precio"
      value={newProduct.price}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          price: e.target.value
        })
      }
      className="border p-2 rounded"
    />

    <input
      type="number"
      placeholder="Stock"
      value={newProduct.stock}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          stock: e.target.value
        })
      }
      className="border p-2 rounded"
    />

    <input
      type="text"
      placeholder="URL Imagen"
      value={newProduct.imageUrl}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          imageUrl: e.target.value
        })
      }
      className="border p-2 rounded md:col-span-2"
    />

    <textarea
      placeholder="Descripción"
      value={newProduct.description}
      onChange={(e) =>
        setNewProduct({
          ...newProduct,
          description: e.target.value
        })
      }
      className="border p-2 rounded md:col-span-2"
    />

    <button
      type="submit"
      className="bg-violet-600 text-white py-2 rounded hover:bg-violet-700 md:col-span-2"
    >
      {editingProduct
    ? "Guardar Cambios"
    : "Crear Producto"}
    </button>

    {editingProduct && (

  <button
    type="button"
    onClick={() => {

      setEditingProduct(null);

      setNewProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
        imageUrl: ""
      });

      setShowForm(false);

    }}
    className="bg-gray-500 text-white py-2 rounded md:col-span-2"
  >
    Cancelar edición
  </button>

)}


  </form>

)}

    
  

</div>

      <div className="bg-white shadow-md rounded p-6 w-full max-w-5xl mb-6">

<input
  type="text"
  placeholder="Buscar producto..."
  value={productSearch}
  onChange={(e) =>
    {
      setProductSearch(e.target.value);
      setCurrentPage(1);
    }
    
  }
  className="border p-2 rounded mb-4"
/>

{/* Tabla de productos */}

  <table className="w-full border-collapse">

    <thead className="bg-violet-700 text-white">

      <tr>
        <th className="p-3">Imagen</th>
        <th className="p-3">Nombre</th>
        <th className="p-3">Categoría</th>
        <th className="p-3">Precio</th>
        <th className="p-3">Stock</th>
        <th className="p-3">Acciones</th>
      </tr>

    </thead>

    <tbody>

      {currentProducts.map((product) => (

        <tr
          key={product.id}
          className="odd:bg-white even:bg-gray-100 hover:bg-violet-100 transition-colors"
        >

          <td className="p-3">

            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-lg shadow"
            />

          </td>

          <td className="p-3 font-medium">
            {product.name}
          </td>

          <td className="p-3">
            {product.category}
          </td>

          <td className="p-3 text-violet-700 font-semibold">
            ${product.price}
          </td>

          <td className="p-3">
            {product.stock}
          </td>

          <td className="p-3">

  <div className="flex gap-3">

    <button
      onClick={() => {

        setShowForm(true);
      
        setEditingProduct(product.id);
      
        setNewProduct({
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
          imageUrl: product.imageUrl
        });
      
      }}
      className="text-yellow-500 hover:text-yellow-600"
      title="Editar"
    >
      <Pencil size={18} />
    </button>

    <button
      onClick={() => deleteProduct(product.id)}
      className="text-red-500 hover:text-red-600"
      title="Eliminar"
    >
      <Trash2 size={18} />
    </button>

  </div>

</td>

        </tr>

      ))}

    </tbody>

  </table>

  <div className="flex justify-center items-center gap-4 mt-6">

  <button
    disabled={currentPage === 1}
    onClick={() =>
      setCurrentPage(
        currentPage - 1
      )
    }
    className="
      bg-violet-600
      text-white
      px-4
      py-2
      rounded
      disabled:bg-gray-300
    "
  >
    Anterior
  </button>

  <span className="font-semibold">

    Página {currentPage} { } 
     de {totalPages}

  </span>

  <button
    disabled={
      currentPage === totalPages
    }
    onClick={() =>
      setCurrentPage(
        currentPage + 1
      )
    }
    className="
      bg-violet-600
      text-white
      px-4
      py-2
      rounded
      disabled:bg-gray-300
    "
  >
    Siguiente
  </button>

</div>

</div>
    

  </>
)}


      



     </div>
    </div>
  );
}


// app/src/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("ASC");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [search, category, sortBy, order, page]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/products",
        {
          params: {
            page,
            limit: 5,
            search,
            category,
            sortBy,
            order,
          },
        }
      );

      setProducts(res.data.products);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">

      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg">

        <h1 className="text-4xl font-bold text-violet-700 dark:text-violet-400 mb-6">
          Catálogo de Tecnología
        </h1>

        <div className="flex gap-3 mb-6 flex-wrap">

          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="border border-violet-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="border border-violet-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">Todas</option>
            <option value="Notebooks">Notebooks</option>
            <option value="Periféricos">Periféricos</option>
            <option value="Monitores">Monitores</option>
            <option value="Audio">Audio</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="border border-violet-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="name">Nombre</option>
            <option value="price">Precio</option>
          </select>

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="border border-violet-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="ASC">Ascendente</option>
            <option value="DESC">Descendente</option>
          </select>

        </div>

        <table className="w-full bg-white border border-violet-200 shadow-md rounded-lg overflow-hidden">

          <thead className="bg-violet-700 text-white">

            <tr>
              <th className="p-3">Nombre</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
            </tr>

          </thead>

          <tbody>

            {products.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-violet-50 transition"
              >
                <td className="border p-3">
                  {product.name}
                </td>

                <td className="border p-3">
                  {product.category}
                </td>

                <td className="border p-3">
                  ${product.price}
                </td>

                <td className="border p-3">
                  {product.stock}
                </td>
              </tr>
            ))}

          </tbody>

        </table>

        <div className="flex gap-4 justify-center items-center mt-6">

          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:bg-gray-300"
          >
            Anterior
          </button>

          <span className="font-semibold text-violet-700">
            Página {page} de {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="bg-violet-600 text-white px-4 py-2 rounded hover:bg-violet-700 disabled:bg-gray-300"
          >
            Siguiente
          </button>

        </div>

      </div>
    </div>
  );
}
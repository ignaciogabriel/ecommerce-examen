// app/src/pages/ProductsPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  const [search, setSearch] = useState("");
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState(
    searchParams.get("category") || ""
  );
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("ASC");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  

  useEffect(() => {
    fetchProducts();

     window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  }, [search, category, sortBy, order, page]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/products",
        {
          params: {
            page,
            limit: 9,
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

  {products.map((product) => (

    <div
      key={product.id}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition"
    >

      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">

        <h3 className="text-lg font-bold mb-2">
          {product.name}
        </h3>

        <p className="text-gray-500 mb-2">
          {product.category}
        </p>

        <p className="text-violet-700 font-bold text-xl mb-2">
          ${product.price}
        </p>

        <p className="text-sm text-gray-600 mb-4">
          Stock disponible: {product.stock}
        </p>

        <button className="w-full bg-violet-600 text-white py-2 rounded hover:bg-violet-700">
          Comprar
        </button>

      </div>

    </div>

  ))}

</div>

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
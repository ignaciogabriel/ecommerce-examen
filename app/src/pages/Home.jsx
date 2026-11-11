// src/pages/Home.jsx

import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  
  const [products, setProducts] = useState([]);

    useEffect(() => {
    fetchProducts();
  }, []);

  const featuredProducts = [...products]
  .reverse()
  .slice(0, 4);

  const categories = [
    ...new Set(
      products.map(
        (product) => product.category
      )
    )
  ];



  const fetchProducts = async () => {

    try {

      const res = await axios.get(
        "http://localhost:3000/api/products"
      );

      setProducts(res.data.products);

    } catch (error) {

      console.error(error);

    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white">


      {/* Hero */}
      <section className="container mx-auto px-6 py-12">

        <div className="flex flex-col md:flex-row items-center gap-10">

          <div className="flex-1 text-center md:text-left">

            <h2 className="text-4xl md:text-5xl font-bold text-violet-700 mb-4">
              Tecnología para potenciar tu día
            </h2>

            <p className="text-gray-600 mb-6">
              Descubrí notebooks, monitores,
              periféricos y accesorios con las
              mejores ofertas.
            </p>

            <Link
              to="/products"
              className="bg-violet-600 text-white px-6 py-3 rounded-lg hover:bg-violet-700"
            >
              Ver productos
            </Link>

          </div>

          <div className="flex-1">
            <img
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              alt="Tecnología"
              className="rounded-xl shadow-lg"
            />
          </div>

        </div>

      </section>

      {/* Categorías */}
      <section className="container mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-violet-700 mb-6">
          Categorías destacadas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {categories.map((cat) => (

            <Link
              key={cat}
              to={`/products?category=${encodeURIComponent(cat)}`}
              className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-all block"
            >
              <h3 className="text-xl font-semibold text-center">
                {cat}
              </h3>
            </Link>

          ))}

        </div>

      </section>

      {/* Productos */}
      <section className="container mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-violet-700 mb-6">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {featuredProducts.map((product) => (

            <div
              key={product.name}
              className="bg-white rounded-xl shadow overflow-hidden"
            >

              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-52 object-cover"
              />

              <div className="p-4">

                <h3 className="font-semibold mb-2">
                  {product.name}
                </h3>

                <p className="text-violet-700 font-bold mb-3">
                  {product.price}
                </p>

                <button className="bg-violet-600 text-white px-4 py-2 rounded w-full">
                  Comprar
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-violet-900 text-white mt-12">

        <div className="container mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">

          <div>
            <h3 className="font-bold mb-3">
              TechStore
            </h3>
            <p>Tecnología para todos.</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">
              Enlaces
            </h3>
            <Link to="/products">Productos</Link>
            <p>Categorías</p>
            <p>Contacto</p>
          </div>

          <div>
            <h3 className="font-bold mb-3">
              Legal
            </h3>
            <p>Términos</p>
            <p>Privacidad</p>
          </div>

        </div>

      </footer>

    </div>
  );
}
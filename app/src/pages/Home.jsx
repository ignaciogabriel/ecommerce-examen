// src/pages/Home.jsx

import { Link } from "react-router-dom";

export default function Home() {


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

          {[
            "Notebooks",
            "Periféricos",
            "Monitores",
            "Audio"
          ].map((cat) => (

            <div
              key={cat}
              className="bg-white p-6 rounded-xl shadow hover:scale-105 transition-all"
            >
              <h3 className="text-xl font-semibold">
                {cat}
              </h3>
            </div>

          ))}

        </div>

      </section>

      {/* Productos */}
      <section className="container mx-auto px-6 py-12">

        <h2 className="text-3xl font-bold text-violet-700 mb-6">
          Productos destacados
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            {
              nombre: "Notebook Lenovo",
              precio: "$1200"
            },
            {
              nombre: "Mouse Logitech",
              precio: "$45"
            },
            {
              nombre: "Monitor Samsung",
              precio: "$280"
            },
            {
              nombre: "Auriculares HyperX",
              precio: "$90"
            }
          ].map((product) => (

            <div
              key={product.nombre}
              className="bg-white rounded-xl shadow overflow-hidden"
            >

              <div className="aspect-square bg-violet-100 flex items-center justify-center">

                <span className="bg-red-500 text-white px-2 py-1 rounded">
                  -20%
                </span>

              </div>

              <div className="p-4">

                <h3 className="font-semibold mb-2">
                  {product.nombre}
                </h3>

                <p className="text-violet-700 font-bold mb-3">
                  {product.precio}
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
            <p>Productos</p>
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
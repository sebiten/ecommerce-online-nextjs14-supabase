import React from "react";
import Link from "next/link";

export default function HeroText() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center h-screen justify-center "
    >
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-5xl font-bold text-center uppercase leading-tight tracking-tight  md:text-6xl">
          Pilcheria Online:{" "}
          <span className="">Tu estilo a un precio excelente</span>
        </h1>

        <p className="text-xl  text-center mx-auto mt-4">
          Descubre una amplia variedad de ropa para hombres, tanto nueva como
          usada, con la mejor relación calidad-precio. <br/>¡Encuentra tu look ideal
          y exprésate sin límites!
        </p>

        <div className="flex justify-center mt-8">
          <Link
            href="/tienda"
            className="inline-flex items-center px-4 py-2 font-bold text-white bg-sky-500 rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <button className="px-4 py-2">Explorar Ahora</button>
            <svg
              className="ml-2 -mr-1 w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 01 1.414 0l6 6a1 1 0 01 0 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 01-1-1V3a1 1 0 01 1-1h7.293z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

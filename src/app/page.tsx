import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function HeroText() {
  return (
    <section
      id="hero"
      className="flex flex-col items-center h-full my-28 justify-center "
    >
      <div className="max-w-7xl mx-auto px-4">
        <Image
          className="mx-auto"
          src="/pilcheria.png"
          alt="logo"
          width={500}
          height={500}
        />
        <h1 className="text-5xl font-bold text-center uppercase leading-tight tracking-tight md:text-6xl -mt-14">
          <span >Tu estilo a un precio excelente</span>
        </h1>

        <p className="text-xl  text-center mx-auto mt-4">
          Descubre una amplia variedad de ropa para hombres, tanto nueva como
          usada, con la mejor relación calidad-precio. <br />
          ¡Encuentra tu look ideal y exprésate sin límites!
        </p>

        <div className="flex justify-center mt-8">
          <Link
            href="/tienda"
            className="inline-flex items-center px-4 py-2 font-bold text-white bg-sky-500 rounded-lg hover:bg-sky-700 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
          >
            <button className="px-4 py-2">Explorar Ahora</button>
          </Link>
        </div>
      </div>
    </section>
  );
}

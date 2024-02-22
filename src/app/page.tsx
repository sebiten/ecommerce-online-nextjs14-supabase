
import React from "react";
import Link from "next/link";


export default function HeroText() {
  return (
    <section
      id="hero"
      className="flex flex-col mt-10 items-center justify-center py-12"
    >
      <div className=" max-w-6xl mx-auto px-4">
        <h1 className="text-center text-5xl font-bold uppercase bg-clip-text">
          Bienvenidos a Pilcheria Online
        </h1>
        <p className="text-lg text-center  mx-auto mt-4">
          Encuentra ropa de distintas variedades para hombres, tanto nuevas como
          usadas. <br /> ¡Y lo mejor? A un precio excelente! 💫
        </p>
        <Link
          href="/tienda"
          className="flex justify-center text-center mt-8 px-4 py-2  rounded-lg  font-bold"
        >
          <button className="font-bold bg-sky-500 p-4 hover:text-white border-gray-200">Explorar Ahora</button>
        </Link>
      </div>
    </section>
  );
}

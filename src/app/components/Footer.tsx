import React from "react";

interface IFooterProps {}

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r py-8 border-t-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-sky-600">Enlaces Rápidos</h2>
          <ul className="mt-2 ">
            <li>
              <a href="/about">Acerca de Nosotros</a>
            </li>
            <li>
              <a href="/contact">Contacto</a>
            </li>
            <li>
              <a href="/faq">Preguntas Frecuentes</a>
            </li>
          </ul>
        </div>

        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold text-sky-600">Síguenos</h2>
          <ul className="flex mt-2 space-x-4">
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Twitter
              </a>
            </li>
            <li>
              <a href="#" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-sky-600">Pilcheria Online</h2>
          <p className="mt-2">
            Encuentra la mejor ropa para hombres a precios increíbles.
          </p>
        </div>
      </div>

      {/* <div className="mt-8 text-center font-bold">
      <p> 2024 Pilcheria Online.</p>
    </div> */}
    </footer>
  );
}

import React from "react";
import Link from "next/link";

interface INavBarProps {}

const NavBar: React.FC<INavBarProps> = () => {
  return (
    <nav className="bg-gradient-to-r from-sky-700 to-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold">Your Logo</span>
        </Link>

        {/* Menú de navegación */}
        <div className="hidden md:flex space-x-4">
          <Link href="/">
            <span className="hover:text-gray-300 transition duration-300">Home</span>
          </Link>

          {/* Agrega más enlaces según tus necesidades */}
        </div>

        {/* Botones de inicio de sesión */}
        <div className="hidden md:flex space-x-4">
          <Link href="/login">
            <span className="hover:text-gray-300 transition duration-300">Login</span>
          </Link>
          <Link href="/signup">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-sky-500 hover:text-white transition duration-300">
              Sign Up
            </span>
          </Link>
          <Link href="/profile">
            <span className="hover:text-gray-300 transition duration-300">Profile</span>
          </Link>
        </div>

        {/* Menú de hamburguesa para pantallas pequeñas */}
        <div className="md:hidden">
          <button className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

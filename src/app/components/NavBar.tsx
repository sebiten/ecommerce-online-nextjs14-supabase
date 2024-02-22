"use client";
import React from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { singout } from "@/app/login/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface INavBarProps {}

export function NavBar({ user }: { user: User | null }) {
  return (
    <nav className="bg-gradient-to-r from-sky-700 to-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <span className="text-2xl font-bold">Your Logo</span>
        </Link>

        {/* Menú de navegación */}
        <div className="hidden md:flex space-x-4">
          {/* Agrega más enlaces según tus necesidades */}
        </div>

        {/* Botones de inicio de sesión */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? null : ( // Ocultar el botón de "Login" si hay un usuario autenticado
            <Link href="/login">
              <span className="hover:text-gray-300 transition duration-300">
                Login
              </span>
            </Link>
          )}
          {user ? (
            <form>
              <button
                className="bg-red-400 text-white px-4 py-2 rounded-full hover:bg-sky-500 hover:text-white transition duration-300 flex flex-col items-center justify-center"
                formAction={async () => {
                  await singout();
                  toast.success("Successfully logged out. Have a great day!");
                }}
              >
                <span>Sign Out</span>
              </button>
            </form>
          ) : (
            <Link href="/signup">
              <span className="bg-white text-gray-900 px-4 py-2 rounded-full hover:bg-sky-500 hover:text-white transition duration-300">
                Sign Up
              </span>
            </Link>
          )}
          {user ? (
            <>
              <Link href="/profile">
                <span className="hover:text-gray-300 mr-4 transition duration-300">
                  Profile
                </span>
              </Link>
              <span className="">{user?.email}</span>
            </>
          ) : null}
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
}

export default NavBar;

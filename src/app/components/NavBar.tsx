"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { singout } from "@/app/login/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModeToggle from "./ModeToggle";
import Image from "next/image";
import { TiShoppingCart } from "react-icons/ti";
import { GiShoppingCart } from "react-icons/gi";
import { useAppContext } from "../context";
import { NavBarDropdown } from "./NavBarDropDown";

export function NavBar({ user }: { user: User | null }) {
  const { cartItems } = useAppContext();
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const aud = user?.aud;
  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <nav className="border-b-2">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <Image height={80} width={120} alt="icon" src="/pilcheria.png" />
        </Link>

        {/* Menú de navegación en dispositivos móviles */}
        <div className="md:hidden flex items-center justify-center gap-4">
          <ModeToggle />
          <div>
            <Link href="/carrito">
              <span className="hover:text-gray-300 flex items-center justify-center transition duration-300">
                <GiShoppingCart size={35} /> <p className="">{totalItems}</p>
              </span>
            </Link>
          </div>
          <NavBarDropdown user={user} />
        </div>

        {/* Resto del NavBar para pantallas medianas y grandes */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="hidden md:flex space-x-4">
            <ModeToggle />
          </div>
          {user ? null : (
            <Link href="/login">
              <span className="hover:text-gray-300 transition duration-300">
                Login
              </span>
            </Link>
          )}
          {user ? (
            <form>
              <button
                className="bg-red-400 text-white px-4 py-3 rounded-lg hover:bg-sky-500 font-bold hover:text-white transition duration-300 flex flex-col items-center justify-center"
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
              <span className="bg-white text-gray-900 px-4 font-bold py-4 rounded-lg hover:bg-sky-500 hover:text-white transition duration-300">
                Sign Up
              </span>
            </Link>
          )}
          {user ? (
            <>
              <Link href="/profile">
                <span className="hover:text-gray-300 mr-3 transition duration-300">
                  Profile
                </span>
              </Link>
              <span className="">Hi! 👋 {user?.email}</span>
            </>
          ) : null}

          {/* Mostrar la cantidad de items en el carrito */}
          {aud === "authenticated" && (
            <div>
              <Link href="/carrito">
                <span className="hover:text-gray-300 flex items-center justify-center transition duration-300">
                  <GiShoppingCart size={35} /> <p className="">{totalItems}</p>
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

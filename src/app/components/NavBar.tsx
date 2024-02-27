"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";
import { singout } from "@/app/login/actions";
import ModeToggle from "./ModeToggle";
import Image from "next/image";
import { GiShoppingCart } from "react-icons/gi";
import { useAppContext } from "../context";
import { NavBarDropdown } from "./NavBarDropDown";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { titleFont } from "../config/fonts";
export function NavBar({ user }: { user: User | null }) {
  const { cartItems } = useAppContext();
  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const aud = user?.aud;
  const userId = user?.id;
  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <nav className="border-b-2 py-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <p className="text-xl text-center font-bold uppercase text-blue-500">
            <span className={titleFont.className}>
              Pilcheria <br /> OnLine
            </span>
          </p>
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
            {/* Mostrar la cantidad de items en el carrito */}
            {aud === "authenticated" && (
              <div>
                <Link href="/carrito">
                  <span className="hover:text-gray-300 flex items-center justify-center transition duration-300">
                    <GiShoppingCart size={35} />{" "}
                    <p className="">{totalItems}</p>
                  </span>
                </Link>
              </div>
            )}
          </div>
          {user ? null : (
            <>
              <Link href="/login">
                <span className="hover:text-gray-300 transition duration-300">
                  Login
                </span>
              </Link>
            </>
          )}
          {user ? (
            <form>
              <Button
                className=" px-4 py-3 rounded-lg hover:bg-red-500 font-bold  transition duration-300 flex flex-col items-center justify-center"
                formAction={async () => {
                  await singout();
                  toast({
                    description: (
                      <pre className="mt-1 leading-tight flex flex-col w-[340px] font-sans text-sm rounded-md font-bold">
                        <code className="leading-loose">Vuelve Pronto!👋</code>
                        <code className="text-green-400 leading-tight">
                          Has salido correctamente ✔️
                        </code>
                      </pre>
                    ),
                  });
                }}
              >
                <span>Sign Out</span>
              </Button>
            </form>
          ) : (
            <Link href="/signup">
              <span className="bg-white text-gray-900 px-4 font-bold py-4 rounded-lg hover:bg-sky-500 hover:text-white transition duration-300">
                Sign Up
              </span>
            </Link>
          )}
          {user ? (
            <div>
              <Link className="flex" href="/profile ">
                <div className="flex items-center justify-center">
                  <Button className="flex items-end justify-end">
                    <span className="">Hi! 👋 </span>
                    <p>{user?.email}</p>
                  </Button>
                </div>
                <div className="ml-4">
                  <Avatar className="ml-1 ">
                    <AvatarImage
                      className="object-cover "
                      src={`https://aaxuhmukpnvrngnsqoym.supabase.co/storage/v1/object/public/profile/user/${userId}?${Date.now()}`}
                      alt="@shadcn"
                    />
                    <AvatarFallback>
                      <Skeleton className="mx-auto rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hover:text-gray-300 mr-3 text-ce transition duration-300">
                    Profile
                  </span>
                </div>
              </Link>
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

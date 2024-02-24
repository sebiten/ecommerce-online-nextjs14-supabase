"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { singout } from "../login/actions";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { User } from "@supabase/supabase-js";
import { GiShoppingCart } from "react-icons/gi";
import { useAppContext } from "../context";
export function NavBarDropdown({ user }: { user: User | null }) {
  const [position, setPosition] = React.useState("bottom");
  const { cartItems } = useAppContext();
  const [cartItemCount, setCartItemCount] = React.useState<number>(0);
  const aud = user?.aud;
  const totalItems = cartItems.reduce(
    (total: number, item: any) => total + item.quantity,
    0
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="focus:outline-none">
          <span className="flex items-center">
            <span className="mr-2">Menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 shadow-lg  rounded-md p-4">
        <DropdownMenuLabel className="text-lg font-semibold text-center">
          Hey!👋 {user?.email}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem
            value="link"
            className="text-lg"
          ></DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        {/* Add your additional menu items here based on the user and other conditions */}
        {user ? (
          <form className="mt-2 flex justify-evenly items-center">
            <Button
              className=" px-6 py-3 rounded-full  font-bold transition duration-300 focus:outline-none"
              onClick={async () => {
                await singout();
                toast.success("Successfully logged out. Have a great day!");
              }}
            >
              <span>Sign Out</span>
            </Button>
            <Link href="/profile">
              <span className="hover:text-blue-500 transition duration-300">
                Profile
              </span>
            </Link>
          </form>
        ) : (
          <div className="flex justify-evenly items-center">
            <Link href="/login">
              <span className="mt-0 block text-lg  hover:text-blue-500 transition duration-300 focus:outline-none">
                Login
              </span>
            </Link>
            <Link href="/signup">
              <span className="hover:text-gray-300 text-lg transition duration-300">
                Register
              </span>
            </Link>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

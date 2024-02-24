"use client";

import React, { useState } from "react";
import { useAppContext } from "../context";
import Image from "next/image";
import Spinner from "../components/Spinner";
import { CartItem, ItemData } from "../../../types";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const { cartItems, setCartItems } = useAppContext();
  const totalPrices: number = cartItems.reduce(
    (total: number, item: ItemData) => total + (item.price || 0),
    0
  );
  const totalItems: number = cartItems.length;

  const handleDeleteItem = (index: number): void => {
    const updatedCartItems: CartItem[] = [...cartItems];
    updatedCartItems.splice(index, 1);
    setCartItems(updatedCartItems);
  };

  return (
    <div className="block lg:flex w-full">
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="w-full lg:w-7/12 mt-4 mx-auto">
            {cartItems.map((item: ItemData, index: number) => (
              <div
                key={`${item.id}-${item.size}`}
                className="p-4 max-w-6xl mx-auto border flex items-center justify-between w-full rounded shadow-md mb-4"
              >
                <div className="flex items-center justify-between mb-4">
                  <Image
                    width={400}
                    height={400}
                    className="w-24 h-24 object-cover mr-4"
                    src={item.images}
                    alt={item.title}
                  />
                  <div className="flex justify-between flex-col">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <h2 className="text-xl font-bold">{item.size}</h2>
                    <p className="text-gray-700">
                      {item.description.slice(0, 50) + "..."}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center">
                  <button
                    className="bg-red-500 text-white p-2 ml-2"
                    onClick={() => handleDeleteItem(index)}
                  >
                    Eliminar
                  </button>
                  <p className="font-bold text-xl">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="lg:fixed top-30 w-full lg:w-1/5 right-0 mt-4 mx-auto p-8 border rounded">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <p className="text-lg">Items: {totalItems}</p>
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg">Subtotal:</p>
              <p className="font-bold text-xl">${totalPrices}</p>
            </div>
            <Button className="p-3 rounded hover:bg-gray-300 transition-all duration-300">
              Pagar
            </Button>
          </div>
        </>
      ) : (
        <div className="h-screen w-full flex items-center justify-center">
          <Image alt="logo" width={300} height={300} src="/pilcheria.png" />
          <div className="flex-col">
            <p className="text-center text-2xl">No hay items en el carrito.</p>
            <Link href="/tienda">
              <Button className="mt-2">Ir a la tienda</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

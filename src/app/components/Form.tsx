"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";

export interface CartItem {
  id: string;
  size: string;
  price: number;
  quantity: number;
}

export default function Form({  item, aud, params }: any) {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const itemId = params;
  console.log("item", cartItems);
  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = event.target.value;
    setSelectedSize(selectedSize);
  };
  const handleCartButton = ({
    itemId,
    title,
    images,
    description,
    price,
  }: {
    itemId: any;
    title: string;
    images: string;
    description: string;
    price: number;
  }) => {
    // Extract item ID and selected size from the parameters
    const size = selectedSize;

    // Check if both item ID and size are selected
    if (!itemId || !size) {
      console.error("ID o tamaño no seleccionados");
      return;
    }

    // Agregar un nuevo objeto al carrito con cantidad 1
    setCartItems((prevCartItems: CartItem[]) => [
      ...prevCartItems,
      {
        id: itemId,
        size,
        quantity: 1,
        title,
        images,
        description,
        price,
      },
    ]);

    console.log("Item added to cart with quantity 1.");

    // Guardar el carrito actualizado en el localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };
  return (
    <form className="max-w-3xl mx-auto ml-4">
      <div className="flex items-center justify-center">
        <Image
          src={item?.images}
          width={400}
          height={400}
          quality={80}
          alt={item?.title}
          className="rounded-lg shadow-md object-fit  mx-auto mb-4"
        />
        <Image
          src={item?.imagestwo}
          width={400}
          height={400}
          quality={80}
          alt={item?.title}
          className="rounded-lg shadow-md object-fit  mx-auto mb-4"
        />
      </div>
      <p className="text-xl font-semibold mb-2">{item?.title}</p>
      <p className="text-xl font-semibold mb-2">${item?.price}</p>

      <p className="text-gray-500 text-sm mb-2">(item?.created_at)</p>
      <p className="text-gray-700 text-sm mb-4">{item?.description}</p>
      <div className="flex flex-col gap-2">
        <select
          onChange={handleSizeChange}
          name="size"
          className="border p-2 rounded-md focus:outline-none focus:border-blue-500"
        >
          <option value="">Selecciona un talle</option>
          {item?.sizes ? (
            item?.sizes.split(",").map((size: string, index: number) => (
              <option key={index} value={size}>
                {size}
              </option>
            ))
          ) : (
            <option value="" disabled>
              No hay tallas disponibles
            </option>
          )}
        </select>
        <Button
          type="submit"
          onClick={() =>
            handleCartButton({
              itemId: itemId,
              title: item.title,
              price: item.price,
              description: item.description,
              images: item.images,
            })
          }
          // siguiente hacer que el action de este button guarde la informacion al carrito en ls
          className="hover:underline"
          disabled={aud !== "authenticated" || item.inStock <= 0}
        >
          {aud !== "authenticated"
            ? "Tienes que estar logeado"
            : "Agregar al carrito"}
        </Button>
      </div>
    </form>
  );
}

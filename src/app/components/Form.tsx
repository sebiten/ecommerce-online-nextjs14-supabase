"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context";

export interface CartItem {
  id: string;
  size: string;
  price: number;
  quantity: number;
}

export default function Form({ item, aud, params }: any) {
  const { cartItems, setCartItems } = useAppContext();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const itemId = params;
  console.log(cartItems);

  // Obtener datos del localStorage al montar el componente
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, [setCartItems]);

  const handleSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSize = event.target.value;
    setSelectedSize(selectedSize);
  };

  const handleCartButton = () => {
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
        title: item.title,
        images: item.images,
        description: item.description,
        price: item.price,
      },
    ]);
  };

  // Guardar el carrito actualizado en el localStorage después de que el estado ha cambiado
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
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

      <p className=" text-sm mb-2">(item?.created_at)</p>
      <p className=" text-sm mb-4">{item?.description}</p>
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
          type="button"
          onClick={handleCartButton}
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

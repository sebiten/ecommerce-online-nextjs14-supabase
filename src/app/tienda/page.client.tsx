"use client";
import { Database } from "@/lib/supabase/supabase.types";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import { ItemData } from "../../../types";
import { searchFilter } from "../login/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { sizestofilter } from "@/constantes/constantes";
import { revalidatePath } from "next/cache";

export default function PageClient(
  { prenda }: { prenda: any | null },
  { params }: { params: any | null }
) {
  const [searchText, setSearchText] = useState<string>("");

  function handleSearch(e: any) {
    e.preventDefault();
    // Si el campo de búsqueda está vacío, restaura el estado a su valor inicial
    if (!e.target.value.trim()) {
      setSearchText("");
      // Obtiene la URL actual y elimina cualquier parámetro de búsqueda
      const currentUrl = new URL(window.location.href);
      currentUrl.searchParams.delete("title");
      // Reemplaza la URL actual sin parámetros de búsqueda
      window.history.replaceState({}, document.title, currentUrl.toString());
      // Recarga la página
      window.location.reload();
    }
  }

  return (
    <div>
      <form
        className="flex flex-col mt-6 gap-4 max-w-xl mx-auto items-center justify-center"
        action={searchFilter}
      >
        <h2 className="text-center font-bold text-2xl mb-2">
          <span>Explora tus prendas aquí</span>
        </h2>
        <Input
          onChange={(e) => {
            setSearchText(e.target.value);
            handleSearch(e);
          }}
          placeholder="Search model"
          type="text"
          name="title"
          id="title"
          defaultValue={""}
          value={searchText}
        />
        <div className="flex items-center gap-4">
          {sizestofilter?.map((size, index) => (
            <div className="flex items-center justify-center gap-1" key={index}>
              <Checkbox name="size" value={size} id={size} />
              <label
                htmlFor={size}
                className="text-xl font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {size}
              </label>
            </div>
          ))}
          <Button className="font-bold py-4" variant="default" type="submit">
            Search model
          </Button>
        </div>
      </form>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-8 max-w-7xl mx-auto">
        {prenda &&
          prenda.map((item: ItemData) => (
            <Link href={`/tienda/${item.id}`} key={item.id} passHref>
              <div className="relative group rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-full mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.images}
                  alt={item.description}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 group-hover:from-transparent transition-opacity duration-300 ease-in-out"></div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold transition-opacity duration-300 ease-in-out">
                    {item.title}
                  </h3>
                  <div className="flex flex-row justify-between mt-1">
                    <p className="text-xs font-medium transition-opacity duration-300 ease-in-out">
                      {item.sizes
                        ? item.sizes.split(",").join(", ")
                        : "No sizes available"}
                    </p>
                  </div>
                  <p className="text-lg font-bold mt-1 transition-opacity duration-300 ease-in-out">
                    ${item.price}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

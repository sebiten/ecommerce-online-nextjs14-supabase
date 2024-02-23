"use client";

import React, { useState } from "react";
import { useAppContext } from "../context";
import Image from "next/image";
import Spinner from "../components/Spinner";
import { ItemData } from "../../../types";

interface IpageProps {}

export default function Page() {
  const { cartItems } = useAppContext();
  return (
    <div className="w-full flex flex-col p-4 -z-10">
      <div>
        {cartItems?.map((item: ItemData, index: number) => (
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
                // onClick={() => handleDeleteItem(index)}
              >
                Eliminar
              </button>
              <p className="font-bold text-xl">${item.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

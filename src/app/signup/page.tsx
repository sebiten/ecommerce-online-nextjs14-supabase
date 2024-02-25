"use client";
import React from "react";
import { signup } from "../login/actions";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

interface IpageProps {}

export default function page() {
  return (
    <div className="w-full h-screen flex-col flex justify-center items-center">
      <h1 className="text-4xl  tracking-tighter font-bold">
        Create an Account! 😁
      </h1>
      <form className="w-3/12">
        <div className="my-4">
          <label htmlFor="email" className="py-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your best email :)"
            id="email"
            required
            className=" px-3 w-full h-12 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <div className="my-4">
          <label htmlFor="password" className="py-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
            className=" px-3 w-full h-12 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <Button
          formAction={async (formData) => {
            await signup(formData);
            toast({
              description: (
                <pre className="leading-loose flex flex-col mt-1 w-[340px] text-sm font-sans  rounded-md font-bold">
                  <code className="leading-loose">Registro Completado! 😁</code>
                  <code className="leading-loose text-green-400">
                    Revisa tu correo para continuar.✉
                  </code>
                </pre>
              ),
            });
          }}
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}

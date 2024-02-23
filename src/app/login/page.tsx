"use client";
import { Loader2 } from "lucide-react";
import { login, signup } from "./actions";
import React, { Suspense } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Page() {
  return (
    <div className="w-full h-screen flex-col flex justify-center items-center">
      <h1 className="text-4xl  tracking-tighter font-bold">
        Login to your account
      </h1>
      <form className="w-3/12">
        <div className="my-4">
          <label htmlFor="email" className="py-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
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
            required
            className=" px-3 w-full h-12 rounded-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
        </div>
        <button
          formAction={async (formData) => {
            await login(formData);
            toast.success("Logged in successfully.🎊");
          }}
          className="w-full"
        >
          <span className="border-none h-12 rounded-md justify-center flex items-center text-white bg-sky-600 hover:bg-blue-500 transition duration-200 shadow-lg shadow-white/15 w-full">
            Login
          </span>
        </button>
      </form>
    </div>
  );
}

"use client";
import React from "react";
import { signup } from "../login/actions";
import { toast } from "react-toastify";

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
        <button
          formAction={async (formData) => {
            await signup(formData);
            toast.success(
              "Account created successfully. Please check your email to verify your account."
            );
          }}
          className="border-none h-12 rounded-md justify-center flex items-center text-white bg-purple-600 hover:bg-purple-500 transition duration-200 shadow-lg shadow-purple-600/35 w-full"
        >
          Sign up
        </button>
      </form>
    </div>
  );
}

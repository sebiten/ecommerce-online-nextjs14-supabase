import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithubAlt, FaLinkedinIn } from "react-icons/fa";

const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="pt-8 pb-6">
      <div className=" mx-auto px-4">
        <div className="flex flex-wrap justify-center"></div>
        <hr className="my-6 border-gray-700" />
        <div className="flex flex-wrap items-center justify-center">
          <div className="w-full lg:w-4/12 px-4 mx-auto text-center">
            <p className="text-gray-600 my-2 font-bold">Pilcheria Online</p>
            <div className="text-sm justify-center flex items-center gap-4 text-gray-600 font-semibold py-1">
              <Link href="https://www.linkedin.com/in/sebdevspace/">
                <FaLinkedinIn className="text-xl grayscale hover:text-blue-500 " />
              </Link>
              © {year} por Sebastian Burgos.
              <Link href="https://github.com/sebiten">
                <FaGithubAlt className="text-xl text-gray-500 hover:text-gray-400 " />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

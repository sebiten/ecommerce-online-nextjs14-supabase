import Image from "next/image";
import Link from "next/link";
import { createClient } from "./utils/supabase/server";
import { cookies } from "next/headers";
import { singout } from "./login/actions";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-7xl font-bold tracking-tighter">Home Page</h1>
    </main>
  );
}

import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "../utils/supabase/server";
import Avatar from "../components/Avatar";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Spinner from "../components/Spinner";

export default async function About() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className="h-full flex items-center justify-center">
      <Avatar data={data} />
      <div className=" p-8 rounded-md shadow-md">
        <h1 className="text-2xl  font-semibold mt-4">
          Hello, {data.user.email}
        </h1>
        <p className="text-sm mt-2 ">Welcome to our website!</p>

        <div className="mt-6 text-center">
          <Link className="text-blue-500 hover:underline" href="/">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

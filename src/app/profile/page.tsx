import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createClient } from "../utils/supabase/server";
import Avatar from "../components/Avatar";

export default async function About() {
  const supabase = createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/");
  }

  return (
    <div className=" min-h-screen flex items-center justify-center">
      <div className=" p-8 rounded-md shadow-md">
        <div className="text-center">
          <span className="relative inline-block">
            {/* AUI Avatar */}
            <span className="aui-avatar aui-avatar-xxlarge ">
              {/* Avatar Inner */}
              <Avatar data={data} />
              {/* Custom Presence Indicator */}
              <span className="custom-presence-indicator overflow-hidden">
                <svg
                  height="100%"
                  version="1.1"
                  viewBox="0 0 8 8"
                  width="100%"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="4" cy="4" r="4" />
                </svg>
              </span>
            </span>
          </span>
          <h1 className="text-2xl  font-semibold mt-4">
            Hello, {data.user.email}
          </h1>
          <p className="text-sm mt-2 ">Welcome to our website!</p>
        </div>
        <div className="mt-6 text-center">
          <Link className="text-blue-500 hover:underline" href="/">
            Go back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

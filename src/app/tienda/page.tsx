import React from "react";
import PageClient from "./page.client";
import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";

type ProfileParams = {
  [key: string]: string;
};

export default async function page({
  searchParams,
}: {
  searchParams: ProfileParams;
}) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { title, size } = searchParams;

  // Construct the Supabase query with filters
  let query = supabase.from("prenda").select("*");
  if (title) {
    query = query.ilike("title", `%${title}%`);
  }
  if (size) {
    query = query.ilike("sizes", `%${size}%`);
  }
  const { data: prenda, error } = await query;
  return (
    <div>
      <PageClient prenda={prenda} />
    </div>
  );
}

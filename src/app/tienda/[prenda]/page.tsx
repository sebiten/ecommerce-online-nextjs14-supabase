import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { createClient } from "@/app/utils/supabase/server";
import Form from "@/app/components/Form";

export default async function Page({ params }: any) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const itemId: number = params.prenda;
  console.log(itemId);

  const { data: auth, error } = await supabase.auth.getUser();

  const role: string | undefined = auth.user?.role;
  const aud: string | undefined = auth.user?.aud;
  const email: string | undefined = auth.user?.email;
  const { data } = await supabase
    .from("prenda")
    .select("*")
    .eq("id", params.prenda);
  if (data) {
    console.log(data);
  } else if (error) {
    console.log(error);
  }

  return (
    <section className="flex mt-10 items-center justify-center max-w-7xl mx-auto">
      <div className="grid gap-8 items-center justify-center ">
        {data?.map((item: any) => (
          <div key={item.id} className="flex gap-14 p-4 rounded-lg">
            <Form item={item} aud={aud} params={params} />
          </div>
        ))}
      </div>
    </section>
  );
}

import { createClient } from "@/app/utils/supabase/server";
import Form from "@/app/components/Form";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Page({ params }: any) {
  const supabase = createClient();
  const itemId: number = params.prenda;

  const { data: auth, error } = await supabase.auth.getUser();
  const aud: string | undefined = auth.user?.aud;
  const { data } = await supabase
    .from("prenda")
    .select("*")
    .eq("id", params.prenda);
  if (error) {
    console.log(error);
  }

  return (
    <section className="flex my-28 items-center justify-center max-w-7xl mx-auto">
      <div className="grid gap-8 items-center justify-center ">
        {data?.map((item: any) => (
          <div key={item.id} className="flex gap-14 p-4 rounded-lg">
            <Suspense fallback={<Skeleton/>}>
              <Form item={item} aud={aud} params={params} />
            </Suspense>
          </div>
        ))}
      </div>
    </section>
  );
}

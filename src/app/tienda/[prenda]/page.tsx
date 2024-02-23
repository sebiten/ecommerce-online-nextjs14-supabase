import { createClient } from "@/app/utils/supabase/server";
import Form from "@/app/components/Form";

export default async function Page({ params }: any) {
  const supabase = createClient();
  const itemId: number = params.prenda;
  console.log(itemId);

  const { data: auth, error } = await supabase.auth.getUser();
  const aud: string | undefined = auth.user?.aud;
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
    <section className="flex my-28 items-center justify-center max-w-7xl mx-auto">
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

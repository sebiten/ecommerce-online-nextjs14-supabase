"use server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";
import { File } from "buffer";
import { User } from "@supabase/supabase-js";
import { MercadoPagoConfig, Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCES_TOKEN!,
});

type FileBody = Blob | ArrayBufferView | ArrayBuffer | FormData;

// MERCADO PAGO ACTION
export async function payment(formData: FormData) {
  const preference = await new Preference(client).create({
    body: {
      items: [
        {
          id: "pago-prenda",
          title: "Mi producto",
          quantity: 1,
          unit_price: 2000,
        },
      ],
    },
  });
  redirect(preference.sandbox_init_point!);
}

//GET SESSION DATA
export async function getSessionData() {
  const supabase = createClient();
  return supabase.auth.getSession();
}

// OBTENER DATOS DEL INPUT
export async function uploadImage(formData: FormData) {
  "use server";
  const supabase = createClient();
  const { data: session } = await supabase.auth.getSession();
  const userId = session.session?.user.id;
  const file = formData.get("file") as FileBody;

  const { data, error } = await supabase.storage
    .from("profile")
    .upload(`user/${userId}/`, file, {
      upsert: true,
    });

  if (error) {
    console.error(error);
  } else {
    revalidatePath("/profile", "page");
    console.log(data);
  }
}

// -------LOGEARSE-------
export async function login(data: { email: string; password: any }) {
  const supabase = createClient();
  const result = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  return JSON.stringify(result);
}

export async function signup(formData: FormData) {
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

// ----DESLOGEARSE-----
export async function singout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
}

// carrito action

export async function searchFilter(formData: FormData) {
  const titleEntry = formData.get("title");
  const sizeEntry = formData.get("size");

  // Check if the entry is a string before assigning it
  const title = typeof titleEntry === "string" ? titleEntry : null;
  const size = typeof sizeEntry === "string" ? sizeEntry : null;

  // Construct the filter parameter with null if either title or size is missing
  const filterParam: Record<string, string | null> = {
    title: title || null,
    size: size || null,
  };

  // Use URLSearchParams to construct the parameters
  const params = new URLSearchParams();

  // Iterate over the filterParam object and add key-value pairs to params
  for (const [key, value] of Object.entries(filterParam)) {
    if (value !== null) {
      params.append(key, value);
    }
  }

  if (title || size) {
    redirect(`/tienda?${params}`);
  } else {
    redirect("/tienda");
  }
}

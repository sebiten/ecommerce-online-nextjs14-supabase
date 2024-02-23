"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "../utils/supabase/server";

export async function login(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect("/error");
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function signup(formData: FormData) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // type-casting here for convenience
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

export async function singout() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
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

"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  email: z.string().email({
    message: "Email incorrecto",
  }),
  password: z.string().min(6, {
    message: "Se requieren 6 caracteres para la contraseña.",
  }),
});

export default function SignInForm({ login }: any) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const result = await login(data);
    const { error } = JSON.parse(result);
    if (error?.message) {
      toast({
        title: "Datos incorrectos",
        description: (
          <pre className="mt-1 w-[340px] text-lg font-bold rounded-md p-4">
            <code className="text-red-400">{error.message} 🚨</code>
          </pre>
        ),
      });
    } else {
      toast({
        description: (
          <pre className="mt-1 leading-snug flex flex-col w-[340px] font-serif text-sm rounded-md font-bold">
            <code className="leading-loose">Bienvenido {data.email}👋</code>
            <code className="text-green-400 leading-tight">
              Has ingresado correctamente ✔️
            </code>
          </pre>
        ),
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  type="email"
                  onChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="password"
                  {...field}
                  type="password"
                  onChange={field.onChange}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full flex gap-2">
          SignIn
          <AiOutlineLoading3Quarters className={cn("animate-spin")} />
        </Button>
      </form>
    </Form>
  );
}

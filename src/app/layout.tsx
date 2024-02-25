import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "./utils/supabase/server";
import { redirect } from "next/navigation";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ThemeProvider from "@/components/ui/theme-provider";
import { AppWrapper } from "./context";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pilcheria Online",
  description: "Ecommerce de ropa online",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppWrapper>
            <NavBar user={user} />
            <main>{children}</main>
            <Toaster />
            <Footer />
          </AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

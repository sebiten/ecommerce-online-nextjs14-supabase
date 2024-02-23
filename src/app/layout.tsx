import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createClient } from "./utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import ThemeProvider from "@/components/ui/theme-provider";
import { AppWrapper } from "./context";

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
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

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
            <ToastContainer />
            {children}
            <Footer />
          </AppWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}

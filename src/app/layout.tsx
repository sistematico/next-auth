import Link from "next/link";
import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import AuthNav from "@/components/AuthNav";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Simple Auth",
  description: "A simple authentication example using Next.js 16 App Router.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunito.className}>
      <body>
        <div className="flex flex-col h-screen overflow-hidden">
          <header className="md:flex justify-between w-full text-center border-b border-background-alt p-4">
            <div>
              <h2>Next.js Auth</h2>
            </div>
            <AuthNav />
          </header>
          <main className="flex-1 overflow-y-scroll p-4">{children}</main>
          <footer className="w-full text-center border-t border-background-alt p-4">
            Sources on{" "}
            <a
              href="https://github.com/sistematico/next-auth"
              className="underline"
            >
              Github
            </a>
          </footer>
        </div>
      </body>
    </html>
  );
}

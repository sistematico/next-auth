import Link from "next/link";
import Image from "next/image";
import { Nunito } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import AuthNav from "@/components/AuthNav";

const nunito = Nunito({ subsets: ["latin"], preload: false });

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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="shortcut icon"
          href="/nextjs_logo_icon.svg"
          type="image/xml+svg"
          sizes="any"
        />
      </head>
      <body>
        <div className="flex flex-col h-screen overflow-hidden">
          <header className="flex justify-between items-center w-full border-b-2 border-black/50 p-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-bold"
            >
              <Image
                src="/nextjs.svg"
                alt="Next.js"
                width={40}
                height={40}
                className="w-auto h-8 invert hover:opacity-20 duration-500"
              />
            </Link>
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

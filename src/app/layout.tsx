import "./globals.css";
import { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "LoL Info App",
  description:
    "League of Legends companion app, lol info, lol champion, lol Items, champion rotation",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="kr">
      <body className="font-sans antialiased pt-[150px] bg-black text-white">
        <Header />
        <main className="container mx-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import localFont from "next/font/local";
import Footer from "@/components/footer";
import NavBar, { NavBarProps } from "@/components/navbar";

const lloydsFont = localFont({
  src: [
    {
      path: "../../public/fonts/lloyds_bank_jack-boldWEB.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/lloyds_bank_jack-lightWEB.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/lloyds_bank_jack-mediumWEB.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/lloyds_bank_jack-regularWEB.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-lloyds",
});

export const metadata: Metadata = {
  title: "Lloyds Payments Demo",
  description: "Stripe Payments Demo for Lloyds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navbarProps: NavBarProps = {
    name: "Olivia Crawford",
    business_name: "Your Business Ltd",
  };
  return (
    <html lang="en" className="bg-slate-100">
      <body className={lloydsFont.className}>
        <Header />
        <NavBar {...navbarProps} />
        <main className="p-8">
        {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

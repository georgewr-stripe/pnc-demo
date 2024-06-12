import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import NavBar, { NavBarProps } from "@/components/navbar";
import { AccountDataProvider } from "@/hooks/useAccountData";
import { lloydsFont } from "./font";

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
  };
  return (
    <html lang="en" className="bg-slate-100">
      <body className={lloydsFont.className}>
        <AccountDataProvider>
          <div className="sticky top-0">
            <Header />
            <NavBar {...navbarProps} />
          </div>
          <main className="p-8">{children}</main>
          <Footer />
        </AccountDataProvider>
      </body>
    </html>
  );
}

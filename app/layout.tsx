import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CookieConsent } from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Shopen – Din webbutik",
  description:
    "En modern, säker webbshop. Handla tryggt med snabb leverans och säkra betalningar.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sv">
      <body className="min-h-screen flex flex-col bg-white text-brand antialiased">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <CookieConsent />
      </body>
    </html>
  );
}

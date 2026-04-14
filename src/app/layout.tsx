import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import Image from "next/image";
import "./globals.css";

const interFont = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfairFont = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cafe Sample - Smart Order",
  description: "Simplifying order and reservation for Cafe Sample locations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interFont.variable} ${playfairFont.variable} h-full antialiased`}
    >
      <head>
        <meta charSet="UTF-8" />
      </head>
      <body className="min-h-full flex flex-col tracking-tight bg-background">
        {/* Global Ambient Background with animated floating elements */}
        <div className="fixed inset-0 pointer-events-none z-[-1] flex flex-col justify-between overflow-hidden">
           <div className="absolute top-0 right-[-10%] w-[60vw] max-w-[500px] opacity-[0.04] ornament-float">
             <Image src="/ornaments/coffee-branch.svg" alt="" width={500} height={500} className="w-full h-auto object-contain" priority />
           </div>
           <div className="absolute bottom-[-5%] left-[-10%] w-[50vw] max-w-[400px] opacity-[0.04] ornament-float-delayed transform -scale-x-100">
             <Image src="/ornaments/leaf.svg" alt="" width={400} height={400} className="w-full h-auto object-contain" priority />
           </div>
        </div>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}

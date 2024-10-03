import "./globals.css";
import AppProvider from "./../components/AppContext";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/Layout/Header/header";
import Footer from "@/components/Layout/Footer/footer";
import { EdgeStoreProvider } from "./lib/edgestore";
const roboto = Roboto({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata: Metadata = {
  title: "FoodDelivery",
  description: "Order your food now!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={roboto.className}>
        <AppProvider>
          <Header />
          <div>
            <EdgeStoreProvider>{children}</EdgeStoreProvider>
          </div>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}

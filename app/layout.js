import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/foter";
import { Analytics } from '@vercel/analytics/next';
import { RateLimitToast } from "@/components/RateLimitToast";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RivieraInfo - Find Your Perfect Event Combination",
  description: "Discover and combine events that match your interests, schedule, and budget",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <Header />
        <main>{children}</main>
        {/* <Footer /> */}
        <Analytics />
        <RateLimitToast />
        <Toaster />
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/foter";
import { RateLimitToast } from "@/components/RateLimitToast";
import { Toaster } from "@/components/ui/toaster";
import { GoogleTagManager } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RivieraInfo - Find Your Perfect Event Combination",
  description: "Discover and combine events that match your interests, schedule, and budget",
  icons: {
    icon: '/logo.jpeg',
    apple: '/logo.jpeg',
    shortcut: '/logo.jpeg',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <Header />
        <main>{children}</main>
        <GoogleTagManager gtmId="G-R40NJB7Y09" />
        <Toaster />
      </body>
    </html>
  );
}

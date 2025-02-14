import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/foter";
import { RateLimitToast } from "@/components/RateLimitToast";
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';

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
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-R40NJB7Y09"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-PZZK60VJSZ');
        `}
      </Script>
      <body className={`${inter.className} min-h-screen bg-black text-white`}>
        <Header />
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

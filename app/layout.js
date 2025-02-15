import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/header";
import { Footer } from "./components/foter";
import { RateLimitToast } from "@/components/RateLimitToast";
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import { headers } from 'next/headers';

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

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const nonce = headersList.get('x-nonce');

  return (
    <html lang="en" className="dark">
      <head>
        <meta name="csp-nonce" content={nonce} />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-R40NJB7Y09"
        strategy="afterInteractive"
        nonce={nonce}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        nonce={nonce}
      >
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
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

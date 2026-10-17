import type { Metadata } from "next";
import localFont from "next/font/local";
import { Space_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PortfoliteBackground } from "@/components/ui/portfolite-background";
import { personalData } from "@/data/personal";

// Castelia Sans — only Regular weight is available; heavier weights use synthetic bold
const casteliaFont = localFont({
  src: "../../public/fonts/CasteliaSans-Regular.otf",
  variable: "--font-castelia",
  display: "swap",
  fallback: ["Inter", "system-ui", "sans-serif"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-space-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://adarshshandilya.dev"),
  title: `${personalData.name} | ${personalData.title}`,
  description: `${personalData.bio}`,
  keywords: [
    "Adarsh Shandilya",
    "Full-Stack Developer",
    "Software Engineer",
    "Backend Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Realtime Systems",
  ],
  authors: [{ name: personalData.name }],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: `${personalData.name} | ${personalData.title}`,
    description: personalData.headline,
    url: "https://adarshshandilya.dev",
    siteName: `${personalData.name} Portfolio`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${personalData.name} | ${personalData.title}`,
    description: personalData.headline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${casteliaFont.variable} ${spaceMono.variable} dark scroll-smooth`}
    >
      <body className="flex min-h-screen flex-col bg-[#060504] text-[#FFFFFF] antialiased selection:bg-amber-500/25 selection:text-[#FFFFFF]">
        <PortfoliteBackground />
        <Header />
        <main className="relative z-10 flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

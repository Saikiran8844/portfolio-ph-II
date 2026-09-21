import type { Metadata } from "next";
import { Poppins, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { BASE_URL, OG_IMAGE } from "@/lib/constants";
import LenisWrapper from "@/providers/lenis-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import FooterSection from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import StructuredData from "@/components/common/structured-data";
import Analytics from "@/components/common/analytics";
import ConsoleLog from "@/components/common/console-log";
import CustomCursor from "@/components/ui/custom-cursor";
import { Toaster } from "sonner";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-accent",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

import { MotionProvider } from "@/providers/motion-provider";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Saikiran Nannapaneni — Software Engineer & Creative Technologist",
    template: "%s | Saikiran Nannapaneni",
  },
  description:
    "Personal portfolio of Saikiran Nannapaneni. Software Engineer crafting distributed microservices, Generative AI tooling, and interactive web experiences with React, Vue, Three.js, and GSAP.",
  keywords: [
    "Saikiran Nannapaneni",
    "Software Engineer",
    "Creative Technologist",
    "Distributed Systems",
    "Spring Boot",
    "Microservices",
    "React",
    "Vue.js",
    "Three.js",
    "WebGL",
    "GSAP",
    "Generative AI",
    "MCP",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Saikiran Nannapaneni" }],
  creator: "Saikiran Nannapaneni",
  publisher: "Saikiran Nannapaneni",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: BASE_URL,
    title: "Saikiran Nannapaneni — Software Engineer & Creative Technologist",
    description:
      "Personal portfolio of Saikiran Nannapaneni. Crafting high-throughput distributed microservices, Generative AI & MCP tooling, and interactive 60fps web experiences.",
    siteName: "Saikiran Nannapaneni",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Saikiran Nannapaneni Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saikiran Nannapaneni — Software Engineer & Creative Technologist",
    description:
      "Personal portfolio of Saikiran Nannapaneni. Crafting high-throughput distributed microservices, Generative AI & MCP tooling, and interactive 60fps web experiences.",
    creator: "@Saikiran8844",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "Saikiran Nannapaneni Portfolio",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon" },
      { url: "/md-red-logo.svg", type: "image/svg+xml" },
    ],
    shortcut: "/md-red-logo.svg",
    apple: "/md-red-logo.svg",
  },
  manifest: "/manifest.webmanifest",
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "your-google-verification-code",
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning: next-themes adds the `class="dark"` +
  // `color-scheme` style to <html> on the client, which the server can't know
  // about — this tells React to ignore that expected attribute mismatch.
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*
          The hero video (/hv.webm) is eagerly buffered by its own
          <video preload="auto" fetchpriority="high"> in AboutMe. We intentionally
          do NOT use <link rel="preload" as="video"> — browsers reject "video" as
          an unsupported `as` value, which is what triggered the console warning.
        */}

        {/* Warm up Vimeo connections early so ShowReel iframes load faster */}
        <link rel="preconnect" href="https://player.vimeo.com" />
        <link rel="preconnect" href="https://i.vimeocdn.com" />
        <link rel="preconnect" href="https://f.vimeocdn.com" />

        {/* ImageKit serves the 47 AboutScrollSection frames (crossOrigin) */}
        <link
          rel="preconnect"
          href="https://ik.imagekit.io"
          crossOrigin="anonymous"
        />
        <link rel="dns-prefetch" href="https://ik.imagekit.io" />

      </head>
      <body
        suppressHydrationWarning
        className={`${poppins.variable} ${cormorantGaramond.variable} antialiased mx-auto`}
      >
        <StructuredData />
        <Analytics />
        <CustomCursor />
        <ConsoleLog />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors closeButton position="top-right" />
          <MotionProvider>
            <LenisWrapper>
              <Navbar />
              {children}
              <FooterSection />
              {/* <FloatingDockDemo /> */}
            </LenisWrapper>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

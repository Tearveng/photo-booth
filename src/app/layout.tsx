import AppAppBar from "@/components/AppAppBar";
import Footer from "@/components/Footer";
import { Box, CssBaseline } from "@mui/material";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "photobooth by vengtear",
    template: "%s | photobooth by vengtear",
  },
  keywords: [
    "Photo booth",
    "Booth",
    "Booth Online",
    "Edit photo booth",
    "Photo booth online",
  ],
  description:
    "BCapture unforgettable moments with our premium photo booth experiences—perfect for weddings, parties, corporate events, and more. Sleek design, instant prints, digital sharing, and custom branding included. Make your next event truly memorable!",
  metadataBase: new URL(`thtps://photobooth.byveng.store`),
  openGraph: {
    title: "photobooth by vengtear",
    description:
      "BCapture unforgettable moments with our premium photo booth experiences—perfect for weddings, parties, corporate events, and more. Sleek design, instant prints, digital sharing, and custom branding included. Make your next event truly memorable!",
    url: `https://photobooth.byveng.store`,
    siteName: "photobooth by vengtear",
    images: [
      {
        url: "/frame_image.png",
        width: 1200,
        height: 630,
        alt: "Image photo booth",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "photobooth by vengtear",
    description:
      "Make it fun. Make it fierce. Make it YOU! Snap a silly face, a sweet smile, or a surprise moment and don't forget to share your masterpiece after",
    creator: "@vengtear",
    images: ["/frame_image.png"],
  },
  alternates: {
    canonical: `https://photobooth.byveng.store`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Box display="flex" flexDirection="column" minHeight="100vh">
            <CssBaseline enableColorScheme />
            <AppAppBar />
            {children}
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}

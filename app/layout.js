import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://essentialmusik.com"), // Replace with your actual domain
  
  title: {
    default: "Essential Musik",
    template: "%s | Essential Musik",
  },
  
  description:
    "Essential Musik is a home for sound that moves differently — exploring the space where rhythm meets emotion. Discover authentic Afrobeats and West African music from Skepper Jarju and emerging artists.",
  
  keywords: [
    "Essential Musik",
    "Afrobeats",
    "Independent Music Label",
    "Skepper Jarju",
    "West African Music",
    "Gambian Artists",
    "Afrobeats Label",
    "African Music",
    "New Music",
    "Indie Label",
  ],
  
  authors: [{ name: "Essential Musik" }],
  creator: "Essential Musik",
  publisher: "Essential Musik",
  
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Essential Musik",
    title: "Essential Musik",
    description:
      "Tune in for the latest tracks, exclusive performances, and behind-the-scenes glimpses into the world of Artists Development. Home to Skepper Jarju and emerging artists redefining modern African sound.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Essential Musik - Defining the Sound of Now",
      },
    ],
  },
  
  twitter: {
    card: "summary_large_image",
    title: "Essential Musik | Independent Afrobeats Label",
    description:
      "Discover authentic Afrobeats and West African music. Home to Skepper Jarju and emerging artists.",
    images: ["/og-image.png"],
    creator: "@essentialmusik",
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
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],
  },
  
  manifest: "/site.webmanifest",
  
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
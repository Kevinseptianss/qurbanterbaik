import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Qurban Terbaik - Hewan Qurban Rawatan Terbaik & Harga Termurah",
  description: "Penyedia hewan qurban rawatan terbaik dengan harga nego termurah. Sapi dan kambing sehat, terpercaya sejak 2010. Hubungi Ibu Evi 0812-9746-3380 untuk pemesanan.",
  keywords: [
    "qurban terbaik",
    "hewan qurban murah",
    "sapi qurban sehat",
    "kambing qurban",
    "harga qurban nego",
    "penyedia qurban terpercaya",
    "qurban rawatan",
    "ibu evi qurban"
  ],
  openGraph: {
    title: "Qurban Terbaik - Hewan Qurban Rawatan Terbaik & Harga Termurah",
    description: "Penyedia hewan qurban rawatan terbaik dengan harga nego termurah. Sapi dan kambing sehat, terpercaya sejak 2010.",
    url: "https://qurbanterbaik.com",
    siteName: "Qurbanterbaik.com",
    images: [
      {
        url: "https://qurbanterbaik.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Qurban Terbaik - Hewan Qurban Berkualitas",
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Qurban Terbaik - Hewan Qurban Rawatan Terbaik & Harga Termurah",
    description: "Penyedia hewan qurban rawatan terbaik dengan harga nego termurah. Sapi dan kambing sehat, terpercaya sejak 2010.",
    images: ['https://qurbanterbaik.com/og-image.jpg'],
  },
  verification: {
    google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
  alternates: {
    canonical: 'https://qurbanterbaik.com',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="geo.region" content="ID" />
        <meta name="geo.placename" content="Indonesia" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
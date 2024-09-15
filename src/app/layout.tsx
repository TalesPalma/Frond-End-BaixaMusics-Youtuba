import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Menu from "@/components/menu/Menu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Donwload Musics",
  description: "Baixar music using golang and youtube-dl in your browser",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background text-primary antialiased`}
      >
        <div className=" m-3">
          <Menu />
          <h1 className="text-2xl text-teal-400 text-wrap text-center" >Download Musics</h1>
        </div>
        {children}
        <div>Footer aqui</div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex w-full items-center justify-center"
      >{children}</body>
    </html>
  )
}
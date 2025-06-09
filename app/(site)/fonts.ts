import { Inter, JetBrains_Mono } from "next/font/google";

export const sans = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-sans",
  weight: ['400', '500', '600', '700'],
})

export const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-mono",
  weight: ['400', '700'],
})

// System serif font doesn't need to be imported
export const serif = {
  variable: "--font-serif",
}
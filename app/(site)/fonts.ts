import { Sora, Zilla_Slab, Space_Mono } from "next/font/google";

export const sans = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-sans",
  weight: ['400', '500', '600', '700'],
});

export const serif = Zilla_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-serif",
  weight: ['400', '500', '600', '700'],
});

export const mono = Space_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: "--font-mono",
  weight: ['400', '700'],
});
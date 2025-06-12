import { Inter } from 'next/font/google'
import { HeaderProvider } from '@/contexts/header-context'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderProvider>
          {children}
        </HeaderProvider>
      </body>
    </html>
  )
} 
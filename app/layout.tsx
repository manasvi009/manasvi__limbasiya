import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Portfolio & Blog',
  description: 'A full-stack portfolio and blog application built with Next.js and MongoDB',
  keywords: ['portfolio', 'blog', 'projects', 'web development'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    title: 'Portfolio & Blog',
    description: 'A full-stack portfolio and blog application',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio & Blog',
    description: 'A full-stack portfolio and blog application',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}

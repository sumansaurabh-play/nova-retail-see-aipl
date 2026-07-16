import type { Metadata } from 'next'
import { Geist, Fraunces } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
})
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["opsz", "SOFT"],
})

export const metadata: Metadata = {
  title: 'Nova Retail — Customer Segmentation & Targeting Strategy',
  description:
    'A board-ready strategic analysis: segmenting Nova Retail\u2019s customer base, identifying the high-value target, and defining a three-year path to becoming a Trusted Technology Partner.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${geist.variable} ${fraunces.variable}`}>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

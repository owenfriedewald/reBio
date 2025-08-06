import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BioMorph - AI Bio Generator | SEO Optimized Bios for Every Platform',
  description: 'Generate SEO-optimized bios for LinkedIn, Twitter, Instagram, YouTube & more with AI. Transform one bio into 8 platform-specific, search-optimized profiles instantly.',
  keywords: 'bio generator, AI bio writer, SEO optimized bio, LinkedIn bio, Twitter bio, Instagram bio, professional bio, social media bio generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
          crossOrigin="anonymous"></script>
      </head>
      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {children}
      </body>
    </html>
  )
}
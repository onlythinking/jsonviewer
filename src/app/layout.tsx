import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'JSON在线格式化工具 - 专业JSON解析器',
    template: '%s | JSON Tools'
  },
  description: '专业的JSON在线格式化、验证、压缩工具。支持JSON美化、语法检查、数据转换、错误定位。免费、快速、安全的JSON处理工具。',
  keywords: [
    'JSON格式化',
    'JSON解析',
    'JSON工具',
    '在线JSON',
    'JSON验证',
    'JSON美化',
    'JSON压缩',
    'JSON转换',
    'JSON编辑器'
  ],
  authors: [{ name: 'JSON Tools Team' }],
  creator: 'JSON Tools',
  publisher: 'JSON Tools',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://json-formatter.vercel.app',
    siteName: 'JSON Tools',
    title: 'JSON在线格式化工具 - 专业JSON解析器',
    description: '专业的JSON在线格式化、验证、压缩工具。支持JSON美化、语法检查、数据转换。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'JSON在线格式化工具',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JSON在线格式化工具',
    description: '专业的JSON在线格式化、验证、压缩工具',
    images: ['/og-image.png'],
  },
  verification: {
    google: 'your-google-verification-code',
  },
  alternates: {
    canonical: 'https://json-formatter.vercel.app',
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <head>
        {/* JSON-LD 结构化数据 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "JSON在线格式化工具",
              "description": "专业的JSON在线格式化、验证、压缩工具",
              "url": "https://json-formatter.vercel.app",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "author": {
                "@type": "Organization",
                "name": "JSON Tools Team"
              }
            })
          }}
        />
      </head>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
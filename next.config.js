/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用压缩
  compress: true,
  // 图片优化
  images: {
    formats: ['image/webp', 'image/avif'],
    dangerouslyAllowSVG: false, // 安全考虑：禁用危险的 SVG
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // 性能优化已默认启用
  // 安全头配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // 防止 MIME 类型嗅探
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // 防止点击劫持
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          // XSS 防护（虽然现代浏览器更依赖 CSP）
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          // 强制 HTTPS（生产环境）
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload',
          },
          // 控制 Referrer 信息泄露
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // 权限策略：限制浏览器功能
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
          },
          // 内容安全策略
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // JSON 处理需要 eval
              "style-src 'self' 'unsafe-inline'", // Tailwind 需要内联样式
              "img-src 'self' data: blob:",
              "font-src 'self' data:",
              "connect-src 'self'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "object-src 'none'",
              "media-src 'none'",
            ].join('; '),
          },
        ],
      },
    ]
  },
  // 重定向配置
  async redirects() {
    return [
      {
        source: '/json',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
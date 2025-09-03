import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 品牌信息 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">J</span>
              </div>
              <span className="text-xl font-bold">JSON Tools</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed max-w-md">
              专业的JSON在线处理工具，提供格式化、验证、压缩、转换等功能。
              免费、快速、安全，是开发者必备的JSON处理工具。
            </p>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a
                href="mailto:support@jsontools.com"
                className="text-gray-400 hover:text-white transition-colors duration-200"
                aria-label="邮箱"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          {/* 工具链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">JSON工具</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  JSON格式化
                </Link>
              </li>
              <li>
                <Link href="/validator" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  JSON验证器
                </Link>
              </li>
              <li>
                <Link href="/minifier" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  JSON压缩器
                </Link>
              </li>
              <li>
                <Link href="/converter" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  JSON转换器
                </Link>
              </li>
            </ul>
          </div>

          {/* 学习资源 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">学习资源</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tutorials" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  使用教程
                </Link>
              </li>
              <li>
                <Link href="/tutorials/json-basics" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  JSON基础知识
                </Link>
              </li>
              <li>
                <Link href="/tutorials/json-validation" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  JSON验证指南
                </Link>
              </li>
              <li>
                <Link href="/examples" className="text-gray-300 hover:text-white text-sm transition-colors duration-200">
                  示例库
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* 底部信息 */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              © {currentYear} JSON Tools. All rights reserved.
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                隐私政策
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                使用条款
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                联系我们
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SEO友好的隐藏内容 */}
      <div className="sr-only">
        <h2>JSON在线工具特性</h2>
        <ul>
          <li>JSON格式化美化 - 将压缩的JSON数据格式化为易读的结构</li>
          <li>JSON语法验证 - 检查JSON语法错误，提供详细的错误信息</li>
          <li>JSON数据压缩 - 移除多余的空格和换行，减小文件体积</li>
          <li>数据类型高亮 - 不同数据类型使用不同颜色显示</li>
          <li>错误定位提示 - 准确定位JSON语法错误的行和列</li>
          <li>一键复制功能 - 快速复制格式化后的JSON数据</li>
          <li>示例数据展示 - 提供常见的JSON数据示例</li>
          <li>统计信息显示 - 显示JSON数据的详细统计信息</li>
        </ul>
      </div>
    </footer>
  )
}
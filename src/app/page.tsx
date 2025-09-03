import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonEditor from '@/components/JsonEditor'

export const metadata: Metadata = {
  title: 'JSON在线格式化工具 - 专业JSON解析器',
  description: '专业的JSON在线格式化、验证、压缩工具。支持JSON美化、语法检查、数据转换、错误定位。免费、快速、安全的JSON处理工具，开发者首选。',
  keywords: 'JSON格式化,JSON解析,JSON工具,在线JSON,JSON验证,JSON美化,JSON压缩,JSON转换,JSON编辑器',
  openGraph: {
    title: 'JSON在线格式化工具 - 专业JSON解析器',
    description: '免费的JSON在线格式化、验证、压缩工具，支持语法检查和错误定位',
    url: 'https://json-formatter.vercel.app',
    type: 'website',
  },
  alternates: {
    canonical: 'https://json-formatter.vercel.app',
  },
}

export default function Home() {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                JSON在线格式化工具
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                专业的JSON处理工具，支持格式化、验证、压缩、转换。
                <span className="text-blue-600 font-semibold">免费、快速、安全</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  实时语法验证
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  语法高亮显示
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  错误定位提示
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  数据统计分析
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JSON Editor Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <JsonEditor />
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                为什么选择我们的JSON工具？
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                我们提供最专业、最全面的JSON处理功能，帮助开发者提高工作效率
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">JSON格式化美化</h3>
                <p className="text-gray-600 leading-relaxed">
                  将压缩的JSON数据格式化为易读的结构，支持自定义缩进，让JSON数据更清晰易懂。
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">实时语法验证</h3>
                <p className="text-gray-600 leading-relaxed">
                  实时检查JSON语法错误，精确定位错误位置，提供详细的错误信息和修复建议。
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">语法高亮显示</h3>
                <p className="text-gray-600 leading-relaxed">
                  不同数据类型使用不同颜色高亮显示，包括字符串、数字、布尔值、null值等。
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">数据压缩优化</h3>
                <p className="text-gray-600 leading-relaxed">
                  移除多余的空格、换行符和注释，有效减小JSON文件体积，提高传输效率。
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">数据统计分析</h3>
                <p className="text-gray-600 leading-relaxed">
                  显示JSON数据的详细统计信息，包括对象数量、数组长度、数据类型分布等。
                </p>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">一键复制分享</h3>
                <p className="text-gray-600 leading-relaxed">
                  一键复制格式化后的JSON数据到剪贴板，支持下载为文件，便于分享和使用。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                常见问题解答
              </h2>
              <p className="text-xl text-gray-600">
                解答您在使用JSON工具时可能遇到的问题
              </p>
            </div>

            <div className="space-y-8">
              <details className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  什么是JSON格式化？
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 leading-relaxed">
                  JSON格式化是将压缩或混乱的JSON数据重新排列成易于阅读的格式的过程。格式化后的JSON具有适当的缩进、换行和空格，使得数据结构更加清晰，便于开发者阅读和调试。
                </div>
              </details>

              <details className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  如何验证JSON数据的正确性？
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 leading-relaxed">
                  我们的工具会实时验证您输入的JSON数据。如果存在语法错误，会立即显示错误信息并指出具体的错误位置（行号和列号），帮助您快速定位和修复问题。常见的JSON错误包括缺少引号、多余的逗号、括号不匹配等。
                </div>
              </details>

              <details className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  JSON压缩有什么用途？
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 leading-relaxed">
                  JSON压缩主要用于减小文件体积，提高网络传输效率。压缩会移除所有不必要的空格、换行符和缩进，使JSON数据更紧凑。这在API接口传输、配置文件存储和数据库存储等场景中非常有用，可以显著减少带宽消耗和存储空间。
                </div>
              </details>

              <details className="bg-white rounded-lg shadow-lg border border-gray-100 p-6 group">
                <summary className="font-semibold text-lg text-gray-900 cursor-pointer flex items-center justify-between">
                  数据安全性如何保障？
                  <svg className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="mt-4 text-gray-600 leading-relaxed">
                  我们非常重视用户数据的安全性。所有JSON处理操作都在您的浏览器本地完成，数据不会上传到服务器。这意味着您的敏感数据始终保留在本地环境中，确保了数据的隐私和安全。我们建议在处理包含敏感信息的JSON数据时，优先选择本地工具。
                </div>
              </details>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
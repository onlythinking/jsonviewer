import { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import JsonEditor from '@/components/JsonEditor'

export const metadata: Metadata = {
  title: 'JSON验证器 - 在线JSON语法检查工具',
  description: '专业的JSON验证器，实时检查JSON语法错误，精确定位错误位置，提供详细错误信息。支持大文件JSON验证，是开发者必备的JSON语法检查工具。',
  keywords: 'JSON验证器,JSON语法检查,JSON错误检测,在线JSON验证,JSON调试工具',
  openGraph: {
    title: 'JSON验证器 - 在线JSON语法检查工具',
    description: '专业的JSON验证器，实时检查语法错误，精确定位错误位置',
    url: 'https://json-formatter.vercel.app/validator',
    type: 'website',
  },
  alternates: {
    canonical: 'https://json-formatter.vercel.app/validator',
  },
}

export default function ValidatorPage() {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-50 to-emerald-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                JSON验证器
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                专业的JSON语法验证工具，实时检查错误，
                <span className="text-green-600 font-semibold">精确定位问题所在</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  实时语法检查
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  错误精确定位
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  详细错误信息
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  修复建议
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

        {/* Validation Guide */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                JSON验证指南
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                了解常见的JSON错误类型和修复方法
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">常见错误类型</h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">缺少引号</h4>
                      <p className="text-gray-600 text-sm">JSON中的字符串必须用双引号包围，单引号无效</p>
                      <code className="block mt-2 p-2 bg-red-50 text-red-700 text-xs rounded">
                        ❌ {'{ name: "value" }'}<br/>
                        ✅ {'{ "name": "value" }'}
                      </code>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">多余的逗号</h4>
                      <p className="text-gray-600 text-sm">JSON不允许在最后一个元素后面有逗号</p>
                      <code className="block mt-2 p-2 bg-red-50 text-red-700 text-xs rounded">
                        ❌ {'{ "name": "value", }'}<br/>
                        ✅ {'{ "name": "value" }'}
                      </code>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-4">
                      <span className="text-red-600 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">括号不匹配</h4>
                      <p className="text-gray-600 text-sm">确保所有的花括号和方括号都正确匹配</p>
                      <code className="block mt-2 p-2 bg-red-50 text-red-700 text-xs rounded">
                        ❌ {'{ "items": [1, 2, 3 }'}<br/>
                        ✅ {'{ "items": [1, 2, 3] }'}
                      </code>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">验证技巧</h3>
                <div className="space-y-6">
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">逐步构建</h4>
                      <p className="text-gray-600 text-sm">从简单的JSON结构开始，逐步添加复杂元素，这样更容易发现错误</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">使用代码编辑器</h4>
                      <p className="text-gray-600 text-sm">大多数代码编辑器都有JSON语法高亮和错误检查功能</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">理解JSON规范</h4>
                      <p className="text-gray-600 text-sm">熟悉JSON标准规范，了解哪些语法是有效的，哪些是无效的</p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4">
                      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">在线验证工具</h4>
                      <p className="text-gray-600 text-sm">使用我们的在线验证器可以快速检查JSON的有效性</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
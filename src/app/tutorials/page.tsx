import { Metadata } from 'next'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'JSON教程中心 - 学习JSON基础知识和实践技巧',
  description: 'JSON教程中心提供全面的JSON学习资源，包括基础知识、语法规范、实践示例和最佳实践。适合初学者和进阶开发者学习JSON技术。',
  keywords: 'JSON教程,JSON学习,JSON基础知识,JSON语法,JSON示例,JSON最佳实践',
  openGraph: {
    title: 'JSON教程中心 - 学习JSON基础知识和实践技巧',
    description: 'JSON教程中心提供全面的JSON学习资源和实践指南',
    url: 'https://json-formatter.vercel.app/tutorials',
    type: 'website',
  },
  alternates: {
    canonical: 'https://json-formatter.vercel.app/tutorials',
  },
}

export default function TutorialsPage() {
  return (
    <>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-purple-50 to-indigo-100 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                JSON教程中心
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                从基础到进阶，全面掌握JSON技术，
                <span className="text-purple-600 font-semibold">成为JSON专家</span>
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  基础入门
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  实践示例
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  最佳实践
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  进阶技巧
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Tutorials Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              {/* JSON基础知识 */}
              <article className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">JSON基础知识</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    了解JSON的基本概念、语法规则和数据类型，为深入学习打好基础。
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">初级</span>
                    <Link 
                      href="/tutorials/json-basics" 
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      开始学习 →
                    </Link>
                  </div>
                </div>
              </article>

              {/* JSON验证指南 */}
              <article className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">JSON验证指南</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    学习如何验证JSON数据的正确性，识别和修复常见的语法错误。
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">初级</span>
                    <Link 
                      href="/tutorials/json-validation" 
                      className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                    >
                      开始学习 →
                    </Link>
                  </div>
                </div>
              </article>

              {/* JSON Schema */}
              <article className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">JSON Schema详解</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    深入了解JSON Schema，学会定义数据结构和验证规则。
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full">中级</span>
                    <span className="text-gray-400">即将推出</span>
                  </div>
                </div>
              </article>

              {/* API设计实践 */}
              <article className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">API设计实践</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    学习如何在REST API中正确使用JSON，包括请求和响应设计。
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-orange-600 bg-orange-100 px-3 py-1 rounded-full">中级</span>
                    <span className="text-gray-400">即将推出</span>
                  </div>
                </div>
              </article>

              {/* 性能优化 */}
              <article className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">JSON性能优化</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    掌握JSON性能优化技巧，提高应用的处理速度和用户体验。
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded-full">高级</span>
                    <span className="text-gray-400">即将推出</span>
                  </div>
                </div>
              </article>

              {/* 安全最佳实践 */}
              <article className="bg-white rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="p-8">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-6">
                    <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">安全最佳实践</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    学习JSON安全处理方法，防范注入攻击和数据泄露风险。
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-red-600 bg-red-100 px-3 py-1 rounded-full">高级</span>
                    <span className="text-gray-400">即将推出</span>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Learning Path */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                学习路径
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                按照推荐的学习路径，循序渐进地掌握JSON技术
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* 学习路径线 */}
                <div className="absolute left-8 top-16 bottom-16 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-red-500"></div>
                
                {/* 学习步骤 */}
                <div className="space-y-12">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                      1
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">基础知识学习</h3>
                      <p className="text-gray-600 mb-4">
                        了解JSON的基本概念、语法规则和数据类型，建立扎实的理论基础。
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">JSON语法</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">数据类型</span>
                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">基本结构</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                      2
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">验证与调试</h3>
                      <p className="text-gray-600 mb-4">
                        学习如何验证JSON数据的正确性，识别和修复常见错误。
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">语法验证</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">错误定位</span>
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">调试技巧</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                      3
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">实践应用</h3>
                      <p className="text-gray-600 mb-4">
                        在实际项目中应用JSON，学习API设计和数据交换最佳实践。
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">API设计</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">数据交换</span>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">项目实战</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-16 h-16 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg relative z-10">
                      4
                    </div>
                    <div className="ml-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">高级优化</h3>
                      <p className="text-gray-600 mb-4">
                        掌握性能优化和安全最佳实践，成为JSON技术专家。
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">性能优化</span>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">安全防护</span>
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">架构设计</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Tips */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                快速提示
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                一些实用的JSON技巧和窍门
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <div className="text-2xl mb-3">💡</div>
                <h4 className="font-semibold text-gray-900 mb-2">使用双引号</h4>
                <p className="text-gray-600 text-sm">JSON中的字符串必须使用双引号，不能使用单引号</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <div className="text-2xl mb-3">🔍</div>
                <h4 className="font-semibold text-gray-900 mb-2">检查逗号</h4>
                <p className="text-gray-600 text-sm">注意最后一个元素后面不能有多余的逗号</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <div className="text-2xl mb-3">🎯</div>
                <h4 className="font-semibold text-gray-900 mb-2">验证工具</h4>
                <p className="text-gray-600 text-sm">使用在线验证工具快速检查JSON的有效性</p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
                <div className="text-2xl mb-3">⚡</div>
                <h4 className="font-semibold text-gray-900 mb-2">格式化阅读</h4>
                <p className="text-gray-600 text-sm">格式化JSON可以大大提高代码的可读性</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
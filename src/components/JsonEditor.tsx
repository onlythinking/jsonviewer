'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { 
  validateJson, 
  formatJson, 
  compressJson, 
  getExampleJson, 
  analyzeJson, 
  validateInputSecurity, 
  sanitizeJsonInput,
  SECURITY_LIMITS 
} from '@/lib/jsonUtils'
import type { JsonValidationResult, SecurityValidationResult } from '@/lib/jsonUtils'

interface JsonEditorProps {
  className?: string
}

export default function JsonEditor({ className }: JsonEditorProps) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [validationResult, setValidationResult] = useState<JsonValidationResult>({ isValid: true })
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([])
  const [isFormatted, setIsFormatted] = useState(false)
  const [showLineNumbers, setShowLineNumbers] = useState(false)
  const [preserveEscape, setPreserveEscape] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [stats, setStats] = useState<any>(null)

  const inputRef = useRef<HTMLTextAreaElement>(null)
  const outputRef = useRef<HTMLDivElement>(null)

  // 处理输入变化（带安全验证）
  const handleInputChange = useCallback((value: string) => {
    // 检查输入大小限制
    if (value.length > SECURITY_LIMITS.MAX_JSON_SIZE) {
      setSecurityWarnings([`输入内容过大，已截断到 ${Math.round(SECURITY_LIMITS.MAX_JSON_SIZE / 1024 / 1024)}MB`])
      value = value.substring(0, SECURITY_LIMITS.MAX_JSON_SIZE)
    }
    
    // 清理输入
    const sanitizedInput = sanitizeJsonInput(value)
    
    // 安全验证
    const securityResult = validateInputSecurity(sanitizedInput)
    setSecurityWarnings(securityResult.warnings || [])
    
    setInput(sanitizedInput)
  }, [])

  // 验证JSON
  const validateAndProcess = useCallback((jsonString: string) => {
    if (!jsonString.trim()) {
      setValidationResult({ isValid: true })
      setOutput('')
      setStats(null)
      setSecurityWarnings([])
      return
    }

    const result = validateJson(jsonString)
    setValidationResult(result)

    if (result.isValid && result.data) {
      try {
        const formatted = formatJson(jsonString, 2)
        setOutput(formatted)
        setStats(analyzeJson(result.data))
        setIsFormatted(true)
      } catch (error) {
        setOutput('格式化失败')
      }
    } else {
      setOutput('')
      setStats(null)
    }
  }, [])

  // 格式化JSON（增强安全版本）
  const handleFormat = useCallback(async () => {
    if (!input.trim()) {
      setSecurityWarnings(['请输入JSON数据'])
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 100)) // 模拟处理时间
      
      // 先进行安全验证
      const securityResult = validateInputSecurity(input)
      if (!securityResult.isValid) {
        setSecurityWarnings([securityResult.error || '安全验证失败'])
        return
      }
      
      const formatted = formatJson(input, 2)
      setOutput(formatted)
      setIsFormatted(true)
      validateAndProcess(input)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'JSON格式错误，无法格式化'
      setSecurityWarnings([message])
    } finally {
      setIsLoading(false)
    }
  }, [input, validateAndProcess])

  // 压缩JSON
  const handleCompress = useCallback(async () => {
    if (!input.trim()) {
      alert('请输入JSON数据')
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 100))
      const compressed = compressJson(input)
      setOutput(compressed)
      setIsFormatted(false)
      validateAndProcess(input)
    } catch (error) {
      alert('JSON格式错误，无法压缩')
    } finally {
      setIsLoading(false)
    }
  }, [input, validateAndProcess])

  // 清空内容
  const handleClear = useCallback(() => {
    setInput('')
    setOutput('')
    setValidationResult({ isValid: true })
    setSecurityWarnings([])
    setStats(null)
    setIsFormatted(false)
    inputRef.current?.focus()
  }, [])

  // 复制结果
  const handleCopy = useCallback(async () => {
    if (!output) {
      alert('没有可复制的内容')
      return
    }

    try {
      await navigator.clipboard.writeText(output)
      alert('已复制到剪贴板')
    } catch (error) {
      // 降级方案
      const textArea = document.createElement('textarea')
      textArea.value = output
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand('copy')
      document.body.removeChild(textArea)
      alert('已复制到剪贴板')
    }
  }, [output])

  // 加载示例
  const handleExample = useCallback(() => {
    const example = getExampleJson()
    setInput(example)
    validateAndProcess(example)
  }, [validateAndProcess])

  // 监听输入变化
  useEffect(() => {
    const timer = setTimeout(() => {
      validateAndProcess(input)
    }, 300)

    return () => clearTimeout(timer)
  }, [input, validateAndProcess])

  return (
    <div className={`bg-white border border-gray-200 overflow-hidden ${className}`}>
      <div className="flex flex-col lg:flex-row min-h-[400px] lg:min-h-[700px]">
        {/* 左侧输入区域 */}
        <div className="flex-1 border-b lg:border-b-0 lg:border-r border-gray-200">
          <div className="p-3 sm:p-4">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="请输入json数据..."
              className="w-full h-48 sm:h-64 lg:h-80 p-3 sm:p-4 border border-gray-300 rounded font-mono text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent touch-manipulation"
              spellCheck={false}
            />
            
            {/* 工具栏 */}
            <div className="flex flex-wrap items-center gap-1 sm:gap-2 mt-3 sm:mt-4 p-2 bg-gray-50 border border-gray-300 rounded">
              {/* 主要操作按钮 */}
              <div className="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto">
                <button
                  onClick={handleFormat}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center gap-1 min-h-[36px] touch-manipulation"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="hidden xs:inline">{isLoading ? '处理中...' : '格式化'}</span>
                </button>
                
                <button
                  onClick={handleCompress}
                  disabled={isLoading}
                  className="flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center gap-1 min-h-[36px] touch-manipulation"
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  <span className="hidden xs:inline">压缩</span>
                </button>
                
                <button 
                  onClick={() => setShowLineNumbers(!showLineNumbers)} 
                  className={`flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded ${showLineNumbers ? 'bg-green-100 text-green-700' : 'bg-white hover:bg-gray-50'} active:bg-gray-100 flex items-center justify-center gap-1 min-h-[36px] touch-manipulation`}
                >
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                  </svg>
                  <span className="hidden sm:inline">行号</span>
                </button>
              </div>
              
              {/* 辅助操作按钮 */}
              <div className="flex flex-wrap gap-1 sm:gap-2 w-full sm:w-auto mt-1 sm:mt-0">
                <button onClick={handleClear} className="flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center gap-1 min-h-[36px] touch-manipulation">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                  <span className="hidden xs:inline">清空</span>
                </button>
                
                <button onClick={handleCopy} className="flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center gap-1 min-h-[36px] touch-manipulation">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <span className="hidden xs:inline">复制</span>
                </button>
                
                <button onClick={handleExample} className="flex-1 sm:flex-none px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 rounded bg-white hover:bg-gray-50 active:bg-gray-100 flex items-center justify-center gap-1 min-h-[36px] touch-manipulation">
                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span className="hidden xs:inline">示例</span>
                </button>
              </div>
              
              {/* 配置选项 */}
              <label className="flex items-center cursor-pointer ml-0 sm:ml-2 mt-1 sm:mt-0 w-full sm:w-auto justify-center sm:justify-start min-h-[36px]">
                <input
                  type="checkbox"
                  checked={preserveEscape}
                  onChange={(e) => setPreserveEscape(e.target.checked)}
                  className="mr-1 sm:mr-2 text-green-600 rounded focus:ring-green-500 w-4 h-4 touch-manipulation"
                />
                <span className="text-xs sm:text-sm text-gray-600">保留转义</span>
              </label>
            </div>
          </div>
        </div>

        {/* 右侧输出区域 */}
        <div className="flex-1">
          <div className="p-3 sm:p-4">
            {output ? (
              <div className="relative">
                <div
                  ref={outputRef}
                  className={`w-full h-48 sm:h-64 lg:h-80 p-3 sm:p-4 border border-gray-300 rounded bg-gray-50 overflow-auto font-mono text-xs sm:text-sm whitespace-pre-wrap touch-manipulation ${
                    showLineNumbers ? 'pl-8 sm:pl-10 lg:pl-12' : ''
                  }`}
                  style={{
                    lineHeight: '1.4',
                    position: 'relative'
                  }}
                >
                  <JsonHighlight 
                    json={output} 
                    showLineNumbers={showLineNumbers}
                  />
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center sm:text-left">
                  可点击键值进行编辑
                </div>
              </div>
            ) : (
              <div className="w-full h-48 sm:h-64 lg:h-80 border border-gray-300 rounded bg-gray-50 flex items-center justify-center text-gray-400">
                <div className="text-center p-4">
                  <svg className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-xs sm:text-sm">格式化后的JSON将显示在这里</p>
                </div>
              </div>
            )}
            
            {/* 状态指示器 */}
            <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-4">
                {validationResult.isValid ? (
                  <span className="text-green-600 text-xs sm:text-sm font-medium flex items-center">
                    <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    JSON有效
                  </span>
                ) : (
                  validationResult.error && (
                    <span className="text-red-600 text-xs sm:text-sm font-medium flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      JSON无效
                    </span>
                  )
                )}
              </div>
              
              {stats && (
                <div className="text-xs text-gray-500 text-center sm:text-right">
                  <span className="inline-block sm:hidden">{stats.size}字符 {stats.keys}键 {stats.depth}层</span>
                  <span className="hidden sm:inline">{stats.size} 字符, {stats.keys} 键, {stats.depth} 层深度</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 底部错误和警告信息 */}
      {(securityWarnings.length > 0 || (!validationResult.isValid && validationResult.error)) && (
        <div className="border-t border-gray-200">
          {/* 安全警告 */}
          {securityWarnings.length > 0 && (
            <div className="p-3 bg-orange-50 border-b border-orange-200">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <div>
                  <p className="text-orange-700 font-medium text-sm">安全提示</p>
                  {securityWarnings.map((warning, index) => (
                    <p key={index} className="text-orange-600 text-xs mt-1">
                      {warning}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 错误信息 */}
          {!validationResult.isValid && validationResult.error && (
            <div className="p-3 bg-red-50">
              <div className="flex items-start">
                <svg className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p className="text-red-600 font-medium text-sm">JSON语法错误</p>
                  <p className="text-red-500 text-xs mt-1">
                    第 {validationResult.error.line} 行，第 {validationResult.error.column} 列：
                    {validationResult.error.message}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

// JSON语法高亮组件
function JsonHighlight({ json, showLineNumbers }: { json: string; showLineNumbers: boolean }) {
  const lines = json.split('\n')

  return (
    <>
      {showLineNumbers && (
        <div className="absolute left-0 top-0 bottom-0 w-6 sm:w-8 lg:w-10 bg-gray-100 border-r border-gray-300 flex flex-col">
          {lines.map((_, index) => (
            <div key={index} className="text-xs text-gray-400 text-right pr-1 sm:pr-2 h-5 sm:h-6 leading-5 sm:leading-6">
              {index + 1}
            </div>
          ))}
        </div>
      )}
      <div className="font-mono text-xs sm:text-sm">
        {lines.map((line, index) => (
          <div key={index} className="h-5 sm:h-6 leading-5 sm:leading-6">
            {highlightJsonLine(line)}
          </div>
        ))}
      </div>
    </>
  )
}

// 高亮JSON行
function highlightJsonLine(line: string) {
  const tokens = tokenizeJsonLine(line)
  
  return tokens.map((token, index) => {
    const { type, value } = token
    let className = ''
    
    switch (type) {
      case 'key':
        className = 'json-key'
        break
      case 'string':
        className = 'json-string'
        break
      case 'number':
        className = 'json-number'
        break
      case 'boolean':
        className = 'json-boolean'
        break
      case 'null':
        className = 'json-null'
        break
      case 'bracket':
        className = 'json-bracket'
        break
      default:
        className = ''
    }
    
    return (
      <span key={index} className={className}>
        {value}
      </span>
    )
  })
}

// JSON行分词
function tokenizeJsonLine(line: string) {
  const tokens = []
  let i = 0
  
  while (i < line.length) {
    const char = line[i]
    
    if (char === '"') {
      // 字符串
      let str = '"'
      i++
      while (i < line.length && line[i] !== '"') {
        if (line[i] === '\\') {
          str += line[i] + (line[i + 1] || '')
          i += 2
        } else {
          str += line[i]
          i++
        }
      }
      str += line[i] || ''
      
      // 判断是键还是值
      const colonIndex = line.indexOf(':', i + 1)
      const nextQuoteIndex = line.indexOf('"', i + 1)
      const isKey = colonIndex > -1 && (nextQuoteIndex === -1 || colonIndex < nextQuoteIndex)
      
      tokens.push({ type: isKey ? 'key' : 'string', value: str })
      i++
    } else if (/[\{\}\[\]]/.test(char)) {
      tokens.push({ type: 'bracket', value: char })
      i++
    } else if (/\d/.test(char) || char === '-') {
      // 数字
      let num = ''
      while (i < line.length && /[\d\.\-e\+]/.test(line[i])) {
        num += line[i]
        i++
      }
      tokens.push({ type: 'number', value: num })
    } else if (line.substr(i, 4) === 'true' || line.substr(i, 5) === 'false') {
      // 布尔值
      const bool = line.substr(i, 4) === 'true' ? 'true' : 'false'
      tokens.push({ type: 'boolean', value: bool })
      i += bool.length
    } else if (line.substr(i, 4) === 'null') {
      // null
      tokens.push({ type: 'null', value: 'null' })
      i += 4
    } else {
      // 其他字符
      tokens.push({ type: 'other', value: char })
      i++
    }
  }
  
  return tokens
}
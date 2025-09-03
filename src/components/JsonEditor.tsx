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
    <div className={`bg-white rounded-xl shadow-lg overflow-hidden ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* 输入区域 */}
        <div className="border-r border-gray-200">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">输入JSON数据</h2>
          </div>
          
          <div className="p-6">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="请输入JSON数据..."
              className="code-editor w-full h-96 resize-none"
              spellCheck={false}
            />
            
            {/* 输入工具栏 */}
            <div className="flex flex-wrap gap-3 mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={handleFormat}
                disabled={isLoading}
                className="btn-primary"
              >
                {isLoading ? '处理中...' : '格式化'}
              </button>
              <button
                onClick={handleCompress}
                disabled={isLoading}
                className="btn-secondary"
              >
                压缩
              </button>
              <button onClick={handleClear} className="btn-secondary">
                清空
              </button>
              <button onClick={handleCopy} className="btn-secondary">
                复制结果
              </button>
              <button onClick={handleExample} className="btn-secondary">
                示例
              </button>
            </div>

            {/* 选项 */}
            <div className="flex flex-wrap gap-4 mt-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showLineNumbers}
                  onChange={(e) => setShowLineNumbers(e.target.checked)}
                  className="mr-2 rounded"
                />
                显示行号
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={preserveEscape}
                  onChange={(e) => setPreserveEscape(e.target.checked)}
                  className="mr-2 rounded"
                />
                保留转义
              </label>
            </div>

            {/* 安全警告 */}
            {securityWarnings.length > 0 && (
              <div className="mt-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L5.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                  <div>
                    <p className="text-orange-700 font-medium">安全提示</p>
                    {securityWarnings.map((warning, index) => (
                      <p key={index} className="text-orange-600 text-sm mt-1">
                        {warning}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 错误信息 */}
            {!validationResult.isValid && validationResult.error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-red-600 font-medium">JSON语法错误</p>
                    <p className="text-red-500 text-sm mt-1">
                      第 {validationResult.error.line} 行，第 {validationResult.error.column} 列：
                      {validationResult.error.message}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 输出区域 */}
        <div>
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-800">格式化结果</h2>
              {validationResult.isValid && (
                <span className="text-green-600 text-sm font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  JSON有效
                </span>
              )}
            </div>
          </div>

          <div className="p-6">
            {output ? (
              <div
                ref={outputRef}
                className={`code-editor h-96 whitespace-pre-wrap ${
                  showLineNumbers ? 'pl-12' : ''
                }`}
                style={{
                  background: '#fafafa',
                  lineHeight: '1.5',
                  position: 'relative'
                }}
              >
                <JsonHighlight 
                  json={output} 
                  showLineNumbers={showLineNumbers}
                />
              </div>
            ) : (
              <div className="h-96 bg-gray-50 border border-gray-300 rounded-lg flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p>请在左侧输入JSON数据</p>
                  <p className="text-sm text-gray-400 mt-1">点击&ldquo;格式化&rdquo;按钮进行解析</p>
                </div>
              </div>
            )}

            {/* 统计信息 */}
            {stats && (
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-medium text-blue-800 mb-2">数据统计</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-blue-600">
                  <div>大小: {stats.size} 字符</div>
                  <div>键: {stats.keys} 个</div>
                  <div>对象: {stats.objects} 个</div>
                  <div>数组: {stats.arrays} 个</div>
                  <div>字符串: {stats.strings} 个</div>
                  <div>数字: {stats.numbers} 个</div>
                  <div>布尔: {stats.booleans} 个</div>
                  <div>深度: {stats.depth} 层</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// JSON语法高亮组件
function JsonHighlight({ json, showLineNumbers }: { json: string; showLineNumbers: boolean }) {
  const lines = json.split('\n')

  return (
    <>
      {showLineNumbers && (
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gray-100 border-r border-gray-300 flex flex-col">
          {lines.map((_, index) => (
            <div key={index} className="text-xs text-gray-400 text-right pr-2 h-6 leading-6">
              {index + 1}
            </div>
          ))}
        </div>
      )}
      <div className="font-mono text-sm">
        {lines.map((line, index) => (
          <div key={index} className="h-6 leading-6">
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
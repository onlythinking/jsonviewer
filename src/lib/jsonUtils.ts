// JSON处理工具函数

export interface JsonError {
  line: number
  column: number
  message: string
}

// 安全配置常量
export const SECURITY_LIMITS = {
  MAX_JSON_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_DEPTH: 50, // 最大嵌套深度
  MAX_KEYS: 10000, // 最大键数量
  MAX_STRING_LENGTH: 1000000, // 单个字符串最大长度 1MB
} as const

export interface JsonValidationResult {
  isValid: boolean
  error?: JsonError
  data?: any
}

export interface SecurityValidationResult {
  isValid: boolean
  error?: string
  warnings?: string[]
}

/**
 * 安全验证输入数据
 */
export function validateInputSecurity(input: string): SecurityValidationResult {
  const warnings: string[] = []
  
  // 检查输入大小
  if (input.length > SECURITY_LIMITS.MAX_JSON_SIZE) {
    return {
      isValid: false,
      error: `输入数据过大，最大允许 ${Math.round(SECURITY_LIMITS.MAX_JSON_SIZE / 1024 / 1024)}MB`
    }
  }
  
  // 检查潜在的恶意内容模式
  const suspiciousPatterns = [
    /__proto__/i,
    /constructor/i,
    /prototype/i,
    /function\s*\(/i,
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i,
    /eval\s*\(/i,
    /new\s+Function/i,
  ]
  
  const foundPatterns = suspiciousPatterns.filter(pattern => pattern.test(input))
  if (foundPatterns.length > 0) {
    warnings.push('检测到潜在的不安全内容，请谨慎处理')
  }
  
  // 检查字符串长度异常
  const lines = input.split('\n')
  const longLines = lines.filter(line => line.length > SECURITY_LIMITS.MAX_STRING_LENGTH)
  if (longLines.length > 0) {
    warnings.push('检测到异常长的字符串，可能影响性能')
  }
  
  return {
    isValid: true,
    warnings: warnings.length > 0 ? warnings : undefined
  }
}

/**
 * 清理和转义潜在危险的字符
 */
export function sanitizeJsonInput(input: string): string {
  return input
    .replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f-\u009f]/g, '') // 移除控制字符
    .replace(/\r\n/g, '\n') // 统一换行符
    .trim()
}

/**
 * HTML 转义函数，防止 XSS 攻击
 */
export function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

/**
 * 安全地显示 JSON 内容，防止 XSS
 */
export function sanitizeForDisplay(content: string): string {
  // React 默认会转义文本内容，但为了额外安全我们手动转义
  return content
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/**
 * 验证JSON字符串（带安全检查）
 */
export function validateJson(jsonString: string): JsonValidationResult {
  if (!jsonString.trim()) {
    return {
      isValid: false,
      error: {
        line: 1,
        column: 1,
        message: 'JSON字符串不能为空'
      }
    }
  }

  // 先进行安全验证
  const securityResult = validateInputSecurity(jsonString)
  if (!securityResult.isValid) {
    return {
      isValid: false,
      error: {
        line: 1,
        column: 1,
        message: securityResult.error || '安全验证失败'
      }
    }
  }

  try {
    const data = JSON.parse(jsonString)
    
    // 验证解析后的数据结构安全性
    const structureResult = validateJsonStructure(data)
    if (!structureResult.isValid) {
      return {
        isValid: false,
        error: {
          line: 1,
          column: 1,
          message: structureResult.error || '数据结构验证失败'
        }
      }
    }
    
    return {
      isValid: true,
      data
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : '未知错误'
    const match = errorMessage.match(/at position (\d+)/)
    
    let line = 1
    let column = 1
    
    if (match) {
      const position = parseInt(match[1], 10)
      const lines = jsonString.substring(0, position).split('\n')
      line = lines.length
      column = lines[lines.length - 1].length + 1
    }

    return {
      isValid: false,
      error: {
        line,
        column,
        message: errorMessage
      }
    }
  }
}

/**
 * 验证JSON数据结构的安全性
 */
function validateJsonStructure(data: any, depth: number = 0): SecurityValidationResult {
  // 检查嵌套深度
  if (depth > SECURITY_LIMITS.MAX_DEPTH) {
    return {
      isValid: false,
      error: `JSON嵌套深度过深，最大允许 ${SECURITY_LIMITS.MAX_DEPTH} 层`
    }
  }
  
  if (data === null || typeof data !== 'object') {
    return { isValid: true }
  }
  
  if (Array.isArray(data)) {
    // 验证数组元素
    for (let i = 0; i < data.length; i++) {
      const result = validateJsonStructure(data[i], depth + 1)
      if (!result.isValid) return result
    }
  } else {
    // 验证对象
    const keys = Object.keys(data)
    
    // 检查键的数量
    if (keys.length > SECURITY_LIMITS.MAX_KEYS) {
      return {
        isValid: false,
        error: `对象键数量过多，最大允许 ${SECURITY_LIMITS.MAX_KEYS} 个键`
      }
    }
    
    // 检查危险的键名
    const dangerousKeys = ['__proto__', 'constructor', 'prototype']
    const foundDangerousKeys = keys.filter(key => dangerousKeys.includes(key))
    if (foundDangerousKeys.length > 0) {
      return {
        isValid: false,
        error: `检测到危险的键名: ${foundDangerousKeys.join(', ')}`
      }
    }
    
    // 递归验证值
    for (const key of keys) {
      const result = validateJsonStructure(data[key], depth + 1)
      if (!result.isValid) return result
    }
  }
  
  return { isValid: true }
}

/**
 * 格式化JSON字符串
 */
export function formatJson(jsonString: string, indent: number = 2): string {
  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed, null, indent)
  } catch (error) {
    throw new Error('无法格式化无效的JSON')
  }
}

/**
 * 压缩JSON字符串
 */
export function compressJson(jsonString: string): string {
  try {
    const parsed = JSON.parse(jsonString)
    return JSON.stringify(parsed)
  } catch (error) {
    throw new Error('无法压缩无效的JSON')
  }
}

/**
 * 转义JSON字符串中的特殊字符
 */
export function escapeJson(jsonString: string): string {
  return jsonString
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
}

/**
 * 反转义JSON字符串中的特殊字符
 */
export function unescapeJson(jsonString: string): string {
  return jsonString
    .replace(/\\n/g, '\n')
    .replace(/\\r/g, '\r')
    .replace(/\\t/g, '\t')
    .replace(/\\"/g, '"')
    .replace(/\\\\/g, '\\')
}

/**
 * 生成示例JSON数据
 */
export function getExampleJson(): string {
  const example = {
    "title": "JSON在线格式化工具",
    "description": "专业的JSON处理工具",
    "version": "1.0.0",
    "features": [
      "JSON格式化美化",
      "语法验证和错误提示",
      "数据类型高亮显示",
      "折叠展开功能",
      "一键复制和下载"
    ],
    "config": {
      "enableHighlight": true,
      "autoFormat": false,
      "indentSize": 2,
      "maxFileSize": "10MB"
    },
    "stats": {
      "totalUsers": 10000,
      "dailyRequests": 50000,
      "uptime": 99.9
    },
    "contact": {
      "email": "support@jsontools.com",
      "website": "https://jsontools.com"
    },
    "metadata": {
      "created": "2024-01-01T00:00:00Z",
      "updated": "2024-12-01T12:00:00Z",
      "tags": ["json", "formatter", "validator", "tool"],
      "isPublic": true,
      "author": null
    }
  }
  
  return JSON.stringify(example, null, 2)
}

/**
 * 统计JSON数据信息
 */
export function analyzeJson(data: any): {
  size: number
  keys: number
  arrays: number
  objects: number
  strings: number
  numbers: number
  booleans: number
  nulls: number
  depth: number
} {
  const stats = {
    size: 0,
    keys: 0,
    arrays: 0,
    objects: 0,
    strings: 0,
    numbers: 0,
    booleans: 0,
    nulls: 0,
    depth: 0
  }

  function analyze(obj: any, depth: number = 0): void {
    stats.depth = Math.max(stats.depth, depth)
    
    if (obj === null) {
      stats.nulls++
    } else if (typeof obj === 'string') {
      stats.strings++
    } else if (typeof obj === 'number') {
      stats.numbers++
    } else if (typeof obj === 'boolean') {
      stats.booleans++
    } else if (Array.isArray(obj)) {
      stats.arrays++
      obj.forEach(item => analyze(item, depth + 1))
    } else if (typeof obj === 'object') {
      stats.objects++
      Object.keys(obj).forEach(key => {
        stats.keys++
        analyze(obj[key], depth + 1)
      })
    }
  }

  analyze(data)
  stats.size = JSON.stringify(data).length
  
  return stats
}

/**
 * 检查JSON路径
 */
export function getJsonPath(data: any, searchValue: any): string[] {
  const paths: string[] = []

  function search(obj: any, path: string = ''): void {
    if (obj === searchValue) {
      paths.push(path || 'root')
      return
    }

    if (Array.isArray(obj)) {
      obj.forEach((item, index) => {
        search(item, path ? `${path}[${index}]` : `[${index}]`)
      })
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => {
        search(obj[key], path ? `${path}.${key}` : key)
      })
    }
  }

  search(data)
  return paths
}
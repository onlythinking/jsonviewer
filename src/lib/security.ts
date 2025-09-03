// 安全工具函数

/**
 * 生成随机 nonce 用于 CSP
 */
export function generateNonce(): string {
  const array = new Uint8Array(16)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

/**
 * 验证 URL 是否安全
 */
export function isUrlSafe(url: string): boolean {
  try {
    const urlObj = new URL(url)
    const safeProtocols = ['http:', 'https:', 'mailto:']
    return safeProtocols.includes(urlObj.protocol.toLowerCase())
  } catch {
    return false
  }
}

/**
 * 清理文件名，移除危险字符
 */
export function sanitizeFileName(filename: string): string {
  return filename
    .replace(/[<>:"/\\|?*]/g, '') // 移除 Windows 不允许的字符
    .replace(/[\x00-\x1f\x80-\x9f]/g, '') // 移除控制字符
    .replace(/^\.+/, '') // 移除开头的点
    .substring(0, 255) // 限制长度
    .trim()
}

/**
 * 检查是否为安全的 JSON 属性名
 */
export function isSafePropertyName(name: string): boolean {
  const dangerousNames = [
    '__proto__',
    'constructor',
    'prototype',
    'toString',
    'valueOf',
    'hasOwnProperty',
    'isPrototypeOf',
    'propertyIsEnumerable'
  ]
  return !dangerousNames.includes(name.toLowerCase())
}

/**
 * 深度清理对象，移除危险属性
 */
export function deepSanitizeObject(obj: any, depth: number = 0): any {
  if (depth > 50) return '[Max Depth Exceeded]' // 防止深度过大
  
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  
  if (Array.isArray(obj)) {
    return obj.map(item => deepSanitizeObject(item, depth + 1))
  }
  
  const sanitized: any = {}
  for (const [key, value] of Object.entries(obj)) {
    if (isSafePropertyName(key)) {
      sanitized[key] = deepSanitizeObject(value, depth + 1)
    }
  }
  
  return sanitized
}

/**
 * 计算字符串哈希值（简单的安全检查）
 */
export function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash // Convert to 32-bit integer
  }
  return hash.toString(36)
}

/**
 * 检查内容是否可能包含恶意代码
 */
export function checkForMaliciousContent(content: string): {
  isSafe: boolean
  risks: string[]
} {
  const risks: string[] = []
  
  // 检查脚本标签
  if (/<script[\s\S]*?>[\s\S]*?<\/script>/gi.test(content)) {
    risks.push('检测到脚本标签')
  }
  
  // 检查事件处理器
  if (/on\w+\s*=/gi.test(content)) {
    risks.push('检测到事件处理器')
  }
  
  // 检查 JavaScript 协议
  if (/javascript:/gi.test(content)) {
    risks.push('检测到 JavaScript 协议')
  }
  
  // 检查潜在的注入
  if (/eval\s*\(|Function\s*\(|setTimeout\s*\(|setInterval\s*\(/gi.test(content)) {
    risks.push('检测到可能的代码注入')
  }
  
  // 检查数据 URL
  if (/data:\s*[\w\/\+]+;base64/gi.test(content)) {
    risks.push('检测到 Base64 数据 URL')
  }
  
  return {
    isSafe: risks.length === 0,
    risks
  }
}
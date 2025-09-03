// 安全测试脚本
const { validateInputSecurity, sanitizeJsonInput, validateJson } = require('./src/lib/jsonUtils.ts')

console.log('🔒 JSON查看器安全测试开始...\n')

// 测试1: 大文件限制
console.log('测试1: 大文件限制')
const largeInput = 'x'.repeat(11 * 1024 * 1024) // 11MB
console.log('输入大小:', Math.round(largeInput.length / 1024 / 1024), 'MB')
try {
  const result = validateInputSecurity(largeInput)
  console.log('✅ 大文件检测:', result.isValid ? '未限制' : '已限制')
  if (!result.isValid) console.log('   错误:', result.error)
} catch (e) {
  console.log('❌ 测试失败:', e.message)
}
console.log()

// 测试2: 恶意内容检测
console.log('测试2: 恶意内容检测')
const maliciousInputs = [
  '{"__proto__": {"isAdmin": true}}',
  '{"constructor": {"prototype": {"isAdmin": true}}}',
  '{"data": "<script>alert(1)</script>"}',
  '{"url": "javascript:alert(1)"}',
  '{"code": "eval(malicious_code)"}',
  '{"func": "new Function(\'return process\')"}',
]

maliciousInputs.forEach((input, index) => {
  console.log(`恶意输入 ${index + 1}:`, input.substring(0, 50) + '...')
  try {
    const secResult = validateInputSecurity(input)
    const jsonResult = validateJson(input)
    console.log('   安全检查:', secResult.warnings ? '⚠️  警告' : '✅ 通过')
    console.log('   JSON验证:', jsonResult.isValid ? '✅ 有效' : '❌ 无效')
    if (secResult.warnings) console.log('   警告:', secResult.warnings.join(', '))
    if (!jsonResult.isValid) console.log('   错误:', jsonResult.error?.message)
  } catch (e) {
    console.log('   ❌ 测试失败:', e.message)
  }
  console.log()
})

// 测试3: 输入清理
console.log('测试3: 输入清理')
const dirtyInput = '\x00\x01\x02{"name": "test\r\n"}\x03\x04'
console.log('脏数据长度:', dirtyInput.length)
try {
  const cleaned = sanitizeJsonInput(dirtyInput)
  console.log('清理后长度:', cleaned.length)
  console.log('✅ 输入清理测试完成')
} catch (e) {
  console.log('❌ 清理失败:', e.message)
}
console.log()

// 测试4: 深度嵌套
console.log('测试4: 深度嵌套检测')
let deepJson = ''
for (let i = 0; i < 60; i++) {
  deepJson = `{"level${i}": ${deepJson || '""'}}`
}
console.log('嵌套深度: 60 层')
try {
  const result = validateJson(deepJson)
  console.log('深度检测:', result.isValid ? '❌ 未限制' : '✅ 已限制')
  if (!result.isValid) console.log('   错误:', result.error?.message)
} catch (e) {
  console.log('❌ 测试失败:', e.message)
}

console.log('\n🔒 安全测试完成!')
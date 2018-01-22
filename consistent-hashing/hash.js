/**
 * 模仿 JDK String hashCode
 * @param str
 */
exports.javaHashCode = function (str) {
  if (typeof str !== 'string') throw new TypeError('str must be string')

  let h = 0
  let len = str.length
  let t = 2147483648
  for (let i = 0; i < len; i += 1) {
    h = 31 * h + str.charCodeAt(i)
    if (h > 2147483647) h %= t // 处理java范围溢出
  }
  return h
}

exports.hashCode = function (s) {
  const str = typeof s === 'string' ? s : JSON.stringify(s)

  let hash = 0, charCode, len = str.length
  if (!len) return hash

  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + charCode
    hash |= 0 // 转换为32位int
  }
  return Math.abs(hash)
}

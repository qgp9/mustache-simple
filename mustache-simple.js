/**
 * Dead simple limited mustatche 
 *
 * @param {String} str input string
 * @param {Object} obj (nested) object as a map
 * @param {Array|RegExp} words words array to compile, or pre compiled regexp
 */
function mustache (str, obj, words) {
  return mustache.compileMatch(obj, words)(str)
}

mustache.compileMatch = function (obj, words) {
  let grep = ''
  if (!words) {
    words = Object.keys(obj)
    grep = '[.\\w]*'
  }
  words = new RegExp('\\{\\{\\s*((?:' + words.map(v => v.replace('.', '\\.')).join('|') + ')' + grep + ')\\s*\\}\\}', 'g')
  return str => str.replace(words, (match, p1) => {
    let p = obj
    let ks = p1.split('.')
    for (let i in ks) {
      if (typeof p !== 'object') return match
      p = p[ks[i]]
    }
    if (p === undefined) return match
    if (p === false || p === null) return ''
    if (p.constructor === Number || p.constructor === String) return p
    return match
  })
}

mustache.compileAll = function (obj, words) {
  let grep = ''
  if (!words) {
    words = Object.keys(obj)
    grep = '[.\\w]*'
  }
  const reg = /\{\{\s*([.\w]*)\s*\}\}/g
  words = new RegExp('^' + words.map(v => v.replace('.', '\\.')).join('|') + grep + '$')
  return str => str.replace(reg, (match, p1) => {
    const m = p1.match(words)
    if (!m) return ''
    let p = obj
    let ks = p1.split('.')
    for (let i in ks) {
      if (typeof p !== 'object') return '' 
      p = p[ks[i]]
    }
    if (p === undefined) return ''
    if (p === false || p === null) return ''
    if (p.constructor === Number || p.constructor === String) return p
    return ''
  })
}
  
module.exports = mustache 

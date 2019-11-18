/*
 * string String Array number Number object RegExp function null undefined NaN
 */
function toFullString(o) {
    let result = ''
    if (typeof o === 'string' || o instanceof String) result += `"${o.toString()}"`
    else if (typeof o === 'number' || o instanceof Number) result += o.toString()
    else if (Array.isArray(o)) {
        result = '['
        for (let val of o) {
            result += toFullString(val) + ', '
        }
        result = result.substring(0, result.length - 2)
        result += ']'
    } else if (Object.prototype.toString.call(o) === '[object Object]') {
        result = '{'
        for (let key of [...Object.keys(o), ...Object.getOwnPropertySymbols(o)]) {
            result += `${key}: `
            result += toFullString(o[key]) + ', '
        }
        result = result.substring(0, result.length - 2)
        result += '}'
    } else if (Object.prototype.toString.call(o) === '[object Function]') {
        let str = o.toString()

        //=>简化定义的函数需要在前面加上"function"，普通定义和箭头函数不加
        str = str.indexOf('function') === 0 || str.substring(0, str.indexOf('{')).indexOf('=>') >= 0 ? str : 'function '.concat(str)
        result += str
    } else if (Object.prototype.toString.call(o) === '[object RegExp]') {
        result += o.toString()
    } else if (Object.prototype.toString.call(o) === '[object Null]') {
        result += 'null'
    } else if (Object.prototype.toString.call(o) === '[object Undefined]') {
        result += 'undefined'
    } else if (isNaN(o)) {
        result += 'NaN'
    }

    //--------------------（未完成）Class-----------------------//

    return result
}

module.exports = toFullString
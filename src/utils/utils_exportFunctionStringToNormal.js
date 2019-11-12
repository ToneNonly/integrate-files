/**
 * MODIFY COMMONJS FUNCTION TO NORMAL FUNCTION
 * @param {String} data
 * @param {String} name
 * @returns {String} 
 */
module.exports = function exportFunctionStringToNormal(data, name) {
    let str = data.replace('module.exports', `;;\nvar ${name || exportFunctionStringToNormal.name}`)
    return str
}
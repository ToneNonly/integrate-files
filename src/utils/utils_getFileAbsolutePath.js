/**
 * @param {String} dirname
 * @returns {String}
 */
module.exports = function getFileAbsolutePath(dirname = process.cwd()) {
    return function _getFileAbsolutePath(relativePath) {
        return `${dirname}${relativePath}`
    }
}


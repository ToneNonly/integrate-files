const fs = require('fs')

/**
 * @param {String} url
 * @return {WriteStream}
 */
function writeStream(url) {
    return fs.createWriteStream(url)
}

module.exports = writeStream
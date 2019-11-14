const fs = require('fs')
const fap = require('./utils_getFileAbsolutePath')


/**
 * @param {Array<String> | String} data
 * @param {String} targetFile
 * @param {String} coding
 */
function writeStream(data, targetFile, coding = 'UTF8') {
    let ws = fs.createWriteStream(fap()(targetFile))

    if (Array.isArray(data)) {
        for (let i = 0; i < data.length; i++) {
            ws.write(data[i], coding)
        }
        ws.end()
    }
}


module.exports = writeStream
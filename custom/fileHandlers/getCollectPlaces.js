const getFAP = require('../../utils/utils_getFileAbsolutePath')()

const XLSX = require('xlsx')

/**
 * GET PLACES TO BE COLLECTED FROM .XLSX
 * @param {Object} options 
 * @returns {*}
 */
function getCollectPlaces(url, options) {
    const { from, to, position, sheetName } = options

    const workbook = XLSX.readFile(getFAP(url))

    const sheet = workbook.Sheets[sheetName]

    let arr = []

    for (let i = from; i < to; i++) {
        arr.push(sheet[position + i].v)
    }

    return arr
}

module.exports = getCollectPlaces;
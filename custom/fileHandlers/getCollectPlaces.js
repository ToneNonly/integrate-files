const XLSX = require('xlsx')

/**
 * GET PLACES TO BE COLLECTED FROM .XLSX
 * @param {String} url
 * @param {Object} options
 * @returns {*}
 */
function getCollectPlaces(url, options) {
    const { from, to, column, sheetName } = options

    const workbook = XLSX.readFile(url)

    const sheet = workbook.Sheets[sheetName]

    let arr = []

    for (let i = from; i < to; i++) {
        try {
            arr.push(sheet[column + i].v)
        } catch (e) {
            console.log(e)
        }
    }

    return arr
}

module.exports = getCollectPlaces;
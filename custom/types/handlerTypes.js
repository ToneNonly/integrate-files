// let {defaultHandlerFolder, customHandlerFolder} = require('../config/integrateFiles.conf')

// const fs = require('fs')
// let handlerTypes = {}

// function saveFileName(url) {
//     fs.readdir(url, (err, files) => {
//         files.forEach(file => {
//             let handler = file.substring(0, file.lastIndexOf('.'))
//             handlerTypes[handler] = handler
//         })
//     })
// }

// saveFileName(defaultHandlerFolder)
// saveFileName(customHandlerFolder)

let handlerTypes = {
    GET_COLLECT_PLACES: 'getCollectPlaces'
}

module.exports = handlerTypes
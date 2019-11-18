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
    //=>预置处理函数键名默认以$$$开头，键值以$$$开头
}

module.exports = handlerTypes
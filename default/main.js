let config = require('./config/integrateFiles.conf')
const integrateFiles = require('../utils/utils_integrateFiles')
const batchFunctions = require('../utils/utils_batchFunctions')
let Integrate = require('./components/Integrate')
const createWriteStream = require('../utils/utils_createWriteStream')
// const syncExecute = require('../utils/utils_syncExecute')
const fs = require('fs')

//=>创建输出目录
let baseUrl = config.baseUrl
let output = config.output

let folder = output.substring(output.indexOf('/') + 1, output.lastIndexOf('/'))
let fullDir = baseUrl + '/' + folder
console.log(fullDir)
if (fs.readdirSync(baseUrl).indexOf(folder) < 0) fs.mkdirSync(fullDir)

let integrate = new Integrate({
    config, 
    _integrateFiles: integrateFiles, 
    batchFunctions, 
    writeStream: createWriteStream(baseUrl + '/' + output), 
    // syncExecute,
})

let config = require('./config/integrateFiles.conf')
const integrateFiles = require('../utils/utils_integrateFiles')
const batchFunctions = require('../utils/utils_batchFunctions')
let Integrate = require('./components/Integrate')

let integrate = new Integrate(config, integrateFiles, batchFunctions)
const batchFunctions = require('../../utils/utils_batchFunctions')
const integrateFiles = require('../../utils/utils_integrateFiles')

class Integrate {
    constructor(config) {
        this.config = config

        this.handlers = {}
        this.resources = {}

        this.run()
    }

    run() {
        //=>初始化钩子函数
        this.initHooks()

        //=>初始化插件
        this.initPlugins(config.plugins)

        //=>初始化资源
        this.initResources(config.resources)
    }

    initHooks() {
        this.beforeIntegrate = config.beforeIntegrate || []
        this.beforeReadSingleFile = config.beforeReadSingleFile || []
        this.afterReadSingleFile = config.afterReadSingleFile || []
        this.beforeWriteSingleFile = config.beforeWriteSingleFile || []
        this.afterWriteSingleFile = config.afterWriteSingleFile || []
        this.afterIntegrate = config.afterIntegrate || []
    }

    initPlugins(plugins) {
        batchFunctions(plugins, this)
    }

    initResource(resource) {
        let { name: resourceName, path, handler: hd, callback, output } = resource
        let base = '../../'
        let isArray = Array.isArray(hd)
        let [hdName, ...args] = isArray ? hd : [hd, null]
        let handler = this.handlers[hdName]

        if (!handler) {
            if (hdName.indexOf(this.config.defaultHandlerSymbol) === 0) handler = require(`${base}${this.config.defaultHandlerFolder}/${hdName}`)
            else handler = require(`${base}${this.config.customHandlerFolder}/${hdName}`)
        }

        this.resources[resourceName] = handler.apply(this, [base + path, ...args])

        if (callback) callback.call(this, this.resources[resourceName])

    }

    initResources(resources) {
        if (!Array.isArray(resources) || resources.length === 0) return this.resources = []
        resources.forEach(val => {
            this.initResource(val)
        })
    }
}

module.exports = Integrate
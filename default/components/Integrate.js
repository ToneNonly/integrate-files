class Integrate {
    constructor(config, integrateFiles, batchFunctions) {
        this.config = config

        this.handlers = {}
        this.resources = {}
        this.integrateFiles = integrateFiles
        this.batchFunctions = batchFunctions

        this.run()
    }

    run() {
        //=>初始化钩子函数
        this.initHooks()

        //=>初始化插件，全部存入this.plugins
        this.initPlugins(config.plugins)

        //=>初始化资源，全部存入this.resources
        this.initResources(config.resources)

        //---------------------(未完成)整合文件及尝试缓存-----------------------//
        //=>整合文件
        this.integrateFiles()


        //---------------------(未完成)钩子函数的执行---------------------------//
    }

    //---------（未完成）hooks改为私有属性，确认是否有使用Redux的必要----------//
    initHooks() {
        this.beforeIntegrate = config.beforeIntegrate || []
        this.beforeReadSingleFile = config.beforeReadSingleFile || []
        this.afterReadSingleFile = config.afterReadSingleFile || []
        this.beforeWriteSingleFile = config.beforeWriteSingleFile || []
        this.afterWriteSingleFile = config.afterWriteSingleFile || []
        this.afterIntegrate = config.afterIntegrate || []
    }

    initPlugins(plugins) {
        //---------------(未完成)确认将this设置为空字符串是否可以成功避免影响this指向--------------------//
        batchFunctions(plugins, '', this)
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

    //--------------------(未完成)钩子函数的添加、删除、执行-------------------------------//
    //--------------------(未完成)确认钩子函数是否需要同、异步区分--------------------------//
}

module.exports = Integrate
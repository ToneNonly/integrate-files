class Integrate {
    constructor(config, integrateFiles, batchFunctions, writeStream, syncExecute) {
        this.handlers = {}
        this.resources = {}
        
        //-------------------(未完成)尝试更好的赋值方法-------------------//
        this.config = config
        this.writeStream = writeStream
        this._integrateFiles = integrateFiles
        this.batchFunctions = batchFunctions
        this.syncExecute = syncExecute

        this.run()
    }

    run() {
        //=>初始化钩子函数
        this.initHooks()

        //=>初始化插件，全部存入this.plugins
        this.initPlugins(this.config.plugins)

        //=>初始化资源，全部存入this.resources
        this.initResources(this.config.resources)

        //---------------------(未完成)整合文件及尝试缓存-----------------------//
        //=>整合文件
        this.integrateFiles()

        //---------------------(未完成)钩子函数的执行---------------------------//
    }

    //---------（未完成）hooks改为私有属性，确认是否有使用Redux的必要----------//
    initHooks() {
        this.beforeIntegrate = this.config.beforeIntegrate || []
        this.beforeReadSingleFile = this.config.beforeReadSingleFile || []
        this.afterReadSingleFile = this.config.afterReadSingleFile || []
        this.beforeWriteSingleFile = this.config.beforeWriteSingleFile || []
        this.afterWriteSingleFile = this.config.afterWriteSingleFile || []
        this.afterIntegrate = this.config.afterIntegrate || []
    }

    initPlugins(plugins) {
        //---------------(未完成)确认将this设置为空字符串是否可以成功避免影响this指向--------------------//
        this.batchFunctions(plugins, '', this)
    }

    initResource(resource) {
        let { name: resourceName, path, handler: hd, callback, output } = resource
        let base = '../../'
        let isArray = Array.isArray(hd)
        let [hdName, ...args] = isArray ? hd : [hd, null]
        let handler = this.handlers[hdName]

        if (!handler) {
            if (hdName.indexOf(this.config.defaultHandlerSymbol) === 0) handler = require(`${base}${this.config.defaultHandlerFolder}${hdName}`)
            else handler = require(`${base}${this.config.customHandlerFolder}/${hdName}`)
        }

        //--------------------(未完成)添加网络请求任务---------------------//
        this.resources[resourceName] = handler.apply(this, [this.config.baseUrl + '/' + path, ...args])

        if (callback) callback.call(this, this.resources[resourceName])

    }

    initResources(resources) {
        if (!Array.isArray(resources) || resources.length === 0) return this.resources = []
        resources.forEach(val => {
            this.initResource(val)
        })
    }

    async integrateFiles() {
        //=>执行beforeIntegrate钩子函数
        this.batchFunctions(this.beforeIntegrate)

        //=>整合文件
        await this._integrateFiles(this.writeStream, this.resources, this.beforeWriteSingleFile, this.afterWriteSingleFile, this.batchFunctions)
    
        //=>执行afterIntegrate钩子函数
        this.batchFunctions(this.afterIntegrate)

    }

    //--------------------(未完成)钩子函数的添加、删除、执行-------------------------------//
    //--------------------(未完成)确认钩子函数是否需要同、异步区分--------------------------//
}

module.exports = Integrate
const CustomEvent = require('./CustomEvent')

class Integrate extends CustomEvent {
    constructor(options) {
        //=>初始化事件
        super(options.eventOptions, options.config.hooks)
        //=>初始化处理器
        this.handlers = {}
        //=>初始化资源
        this.resources = new Map()

        //=>批量赋值
        Object.assign(this, options)

        this.run()
    }

    run() {
        //=>初始化资源，全部存入this.resources
        this.initResources(this.config.resources)

        //=>初始化插件，全部存入this.plugins
        this.initPlugins(this.config.plugins)

        //---------------------(未完成)整合文件及尝试缓存-----------------------//
        //=>整合文件
        this.integrateFiles()
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
        this.resources.set(resourceName, handler.apply(this, [this.config.baseUrl + '/' + path, ...args]))

        if (callback) callback.call(this, this.resources.get(resourceName))

    }

    initResources(resources) {
        if (!Array.isArray(resources) || resources.length === 0) return this.resources = []
        resources.forEach((val, ind) => {
            this.dispatchEvent({
                event: 'beforeDealWithSingleFile',
                data: {
                    current: val,
                    index: ind,
                    whole: resources
                }
            })
            this.initResource(val)
            this.dispatchEvent({
                event: 'afterDealWithSingleFile',
                data: {
                    current: val,
                    index: ind,
                    whole: resources
                }
            })
        })
    }

    async integrateFiles() {
        //=>执行beforeIntegrate钩子函数
        this.dispatchEvent({
            event: 'beforeIntegrate',
            data: {
                whole: this.resources
            }
        })

        //=>整合文件
        await this._integrateFiles({
            writeStream: this.writeStream,
            resources: this.resources,
            beforeWriteSingleFile: (data) => this.dispatchEvent.call(this, {event: 'beforeWriteSingleFile', data}),
            afterWriteSingleFile: (data) => this.dispatchEvent.call(this, {event: 'afterWriteSingleFile', data})
        })

        //=>执行afterIntegrate钩子函数
        this.dispatchEvent({
            event: 'afterIntegrate',
            data: {
                whole: this.resources
            }
        })

    }

    //--------------------(未完成)确认钩子函数是否需要同、异步区分--------------------------//
}

module.exports = Integrate
const configTypes = require('../types/configTypes')
const resourceTypes = require('../../custom/types/resourceTypes')
const handlerTypes = {...require('../types/handlerTypes'), ...require('../../custom/types/handlerTypes')}

module.exports = {
    //=>基准地址
    baseUrl: process.cwd(),

    //=>入口,相对于startIntegrate.js所在目录，即package.json中绑定shoot命令的文件所在目录
    enter: './default/main.js',

    //=>出口
    output: './output/main.js',

    //=>开发模式：develop / production
    mode: '',

    //=>资源文件配置
    resources: [
        //=>文件路径是相对于入口文件而言的相对路径，以/开头

        /**
         * path {String} 文件相对路径
         * name {String} 储存文件处理结果的变量名称
         * callback {Function} 读取文件成功后的回调函数
         *      @param data {String} 字符串格式的文件内容
         *      @returns {String} 文件内容格式化后的输出
         * handler {String | Array} 文件的处理函数
         *      @ {String} 调用对应的预置或注册的处理函数
         *      @ {Array}  [handler: String[, arguments: Array]]
         * （未实现）output {String} 如设置，则将文件处理的最终结果单独储存为该文件
         * （未实现）forceUpdate {Boolean} 如设置，则不顾缓存强制刷新文件内容
         */
        {
            path: './custom/resource/1.xlsx',
            name: resourceTypes.COLLECT_PLACES,
            handler: [handlerTypes.GET_COLLECT_PLACES, {
                from: 1,
                to: 138,
                column: 'A',
                sheetName: '整理'
            }]
        }
    ],

    //=>命名resources的变量名称集合
    resourceTypes: './custom/types/resourceTypes.js',

    //=>预置处理函数名称标识
    defaultHandlerSymbol: '$default',

    //=>自定义处理函数
    customHandlerFolder: './custom/fileHandlers/',

    //=>预置处理函数
    defaultHandlerFolder: './default/fileHandlers/',

    //=>插件
    //=>格式为()=>new XXX(integrate)
    plugins: [

    ],

    beforeReadSingleFile: [

    ],

    afterReadSingleFile: [

    ],

    beforeWriteSingleFile: [

    ],

    afterWriteSingleFile: [

    ],

    //=>添加函数到beforeIntegrate钩子函数队列
    beforeIntegrate: [

    ],

    //=>添加函数到afterIntegrate钩子函数队列
    afterIntegrate: [

    ]
}
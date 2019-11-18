const configTypes = require('../types/configTypes')
const resourceTypes = require('../../custom/types/resourceTypes')
const handlerTypes = { ...require('../types/handlerTypes'), ...require('../../custom/types/handlerTypes') }
const cycleGroupMovements = require('../../custom/plugins/cycleGroupMovements')

module.exports = {
    //=>基准路径，startIntegrate.js所在目录
    baseUrl: process.cwd(),

    //=>入口，相对于基准路径
    enter: './default/main.js',

    //=>出口，相对于基准路径
    output: './output/main.js',

    //=>（此为预留配置）开发模式：develop / production
    mode: '',

    //=>资源文件配置
    resources: [

        {
            //=>path {String} 资源路径，相对于基准路径
            path: './custom/resources/1.xlsx',

            //=>name {String} 储存文件处理结果的变量名称，该集合位于custom/types/resourceTypes.js
            name: resourceTypes.PLACES_TO_BE_COLLECTED,

            /*
             * handler {String | Array} 处理器
             *      @ {String} 调用对应的预置或用户自定义处理器，预置处理器应以*$$$*开头
             *      @ {Array}  [handler: String[, arguments: Array]]
             */
            handler: [handlerTypes.GET_COLLECT_PLACES, {
                from: 1,
                to: 138,
                column: 'A',
                sheetName: '整理'
            }],

            /*
             * callback {Function} 处理器回调函数
             *      @param data {Any} 处理结果
             */
            callback(res) {
                //some code//
            }

            //=>（预留）output {String} 如设置，则将最终结果单独储存为该文件
            //=>（预留）forceUpdate {Boolean} 如设置，则不顾缓存强制刷新文件内容
        }
    ],

    //=>命名resources的变量名称集合
    resourceTypes: './custom/types/resourceTypes.js',

    //=>预置处理器名称标识，即以何开头
    defaultHandlerSymbol: '$$$',

    //=>自定义处理器目录
    customHandlerFolder: './custom/fileHandlers/',

    //=>预置处理器目录
    defaultHandlerFolder: './default/fileHandlers/',

    //=>插件
    //=>格式为()=>new XXX(integrate)
    plugins: [
        (ig) => {
            cycleGroupMovements(ig, [
                {
                    target: '#searchipt',
                    move: 'input',
                    time: 0
                },
                {
                    target: '.searchlogo',
                    move: 'click',
                    time: 0
                },
                {
                    target: '.serp-list .poibox',
                    move: 'click',
                    beforeMove(target) {
                        if (!target || target.className.indexOf('poibox-empty') > -1) return false
                        return true
                    },
                    time: 3000
                },
                {
                    target: '.collect',
                    move: 'click',
                    beforeMove(target) {
                        if (target.className.indexOf('faved') >= 0) return false
                        return true
                    },
                    time: 3000
                },
                {
                    time: 1000
                }
            ])
        }
    ],

    /*
     * 生命周期钩子函数
     * 触发顺序（*表示多个资源文件会多次触发）： *beforeDealWithSingleFile、*afterDealWithSingleFile、beforeIntegrate、 *beforeWriteSingleFile、*afterWriteSingleFile、afterIntegrate
     */
    hooks: {

        /* 属性值类型为Array，可一次注册多个监听器，按注册顺序触发
         *     监听器接收一个event参数，event结构如下：
         *         {
         *             event: String  //触发的钩子名称
         *             data: Object   //传送的数据
         *         }     
         */

        //=>处理器处理单个文件前
        beforeDealWithSingleFile: [

            /*
             * data: {
             *      current: Object //配置对象
             *      index: Number //索引
             *      whole: Array //全部配置对象
             * }
             */
            (e) => { console.log(`准备处理：${e.data.current.name}`) }
        ],

        //=>处理器处理单个文件后
        afterDealWithSingleFile: [

            /*
             * data: {
             *      current: Object //配置对象
             *      index: Number //索引
             *      whole: Array //全部配置对象
             * }
             */
            (e) => { console.log(`处理完成：${e.data.current.name}`) }
        ],

        //=>处理器写入单个文件前
        beforeWriteSingleFile: [

            /*
             * data: {
             *      hasWrite: String //已写入的内容
             *      current: Any //当前资源
             *      name: String //当前资源的变量名称
             *      whole: Array //全部资源
             * }
             */
            (e) => { console.log(`准备写入：${e.data.name}...`) }
        ],

        //=>处理器写入单个文件后
        afterWriteSingleFile: [

            /*
             * data: {
             *      hasWrite: String //已写入的内容
             *      current: Any //当前的资源
             *      name: String //当前资源的变量名称
             *      whole: Array //全部资源
             * }
             */
            (e) => { console.log(`写入完成：${e.data.name}`) }
        ],

        //=>添加函数到beforeIntegrate钩子函数队列
        beforeIntegrate: [

            /*
             * data: {
             *      whole: Array //全部资源
             * }
             */
            (e) => { console.log('开始整合文件...') }
        ],

        //=>添加函数到afterIntegrate钩子函数队列
        afterIntegrate: [

            /*
             * data: {
             *      whole: Array //全部资源
             * }
             */
            (e) => { console.log('整合完成^_^') }
        ]
    }
}
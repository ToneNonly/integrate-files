## 介绍
`integrate-files`是一个轻便的、基于文件的、可扩展的Node.js插件，可以将多个不同类型的文件个性化处理后合并成一个.js文件。可用于浏览器页面的批处理等。

## 开发和测试环境
* Visual Studio Code v1.40.1
* macOS v10.15.1
* Node.js v10.15.3
* Chrome v78.0.3904.97
* Safari v13.0.3

## 案例 --- 高德地图位置批量收藏
项目代码中保留了该案例，已内置了若干地址。
使用方法：打开[高德地图主页](https://www.gaode.com/)，成功登录后，复制`output/main.js`中的代码到控制台运行。
`切勿运行多次，容易被"惩罚"-_-`

## 项目结构
* default   *系统内置文档*
    * components   *系统组件*
    * config   *全局配置文件*
    * fileHandlers   *预置处理器*
    * types   *键名集合*
        * configTypes.js   *系统配置*
        * handlerTypes.js   *处理器*
    * main.js   *实际入口文件*
* custom   *用户自定义文档*
    * config   *全局配置文件*
    * fileHandlers   *处理器*
    * plugins   *插件*
    * resources   *资源文件*
    * types   *键名集合*
        * handlerTypes.js   *处理器*
        * resourceTypes.js   *资源变量*
* utils   *工具函数*
* output   *输出*
* startIntegrate.js   *入口文件*

## 概念
### 处理器、资源
[`处理器`](#自定义处理器)的作用是读取文件内容，经过处理后输出

`资源`就是处理后的数据

>如何运行？
>1. 在全局配置文件中配置需要处理的文件；
>2. 文件路径、其他参数传入已注册的处理器
>3. 处理器读取文件并处理数据
>4. 输出处理结果，作为资源以变量的形式储存在当前[Integrate](#Integrate实例)实例上

### 插件
[`插件`](#自定义插件)是一种对已有资源进行二次加工，或者生成新的资源，并且拥有全流程控制权限的程序

## 运行
进入项目根目录，执行`node startIntegrate.js`
```bash
pp@pp integrate-files % node startIntegrate.js  #请确保机器上已经安装了Node.js
```

## 应用指南
### 全局配置文件
`default/config/integrateFiles.conf.js`
```javascript
//somecode//
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
    //=>格式为(ig) => { <pluginName>(ig[, options: Any]) }
    plugins: [
        (ig) => {
            cycleGroupMovements(
                ig, //Integrate实例
                ... //配置
            )
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
            (e) => {console.log(`准备处理：${e.data.current.name}`)}
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
            (e) => {console.log(`处理完成：${e.data.current.name}`)}
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
            (e) => {console.log(`准备写入：${e.data.name}...`)}
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
            (e) => {console.log(`写入完成：${e.data.name}`)}
        ],
    
        //=>添加函数到beforeIntegrate钩子函数队列
        beforeIntegrate: [

            /*
             * data: {
             *      whole: Array //全部资源
             * }
             */
            (e) => {console.log('开始整合文件...')}
        ],
    
        //=>添加函数到afterIntegrate钩子函数队列
        afterIntegrate: [

            /*
             * data: {
             *      whole: Array //全部资源
             * }
             */
            (e) => {console.log('整合完成^_^')}
        ]
    }
}
```

### 自定义处理器
1. 定义处理器
    自定义处理器位于`custom/fileHandlers`，接收一个固定参数：资源绝对路径，接收可选的任意个、任意类型配置对象
    `custom/fileHandlers/getCollectPlaces.js`
    ```javascript
    //somecode//

    /**
     * @param {String} url 资源绝对路径
     * @option {*Any} options 配置
     * @return {Any} 处理结果
     */
    function getCollectPlaces(url, options) {
        const { from, to, column, sheetName } = options

        const workbook = XLSX.readFile(url)

        const sheet = workbook.Sheets[sheetName]

        let arr = []

        for (let i = from; i < to; i++) {
            try {
                arr.push(sheet[column + i].v)
            } catch (e) {
                console.log(e)
            }
        }

        return arr
    }

    //=>导出自定义处理器
    module.exports = getCollectPlaces;
    ```

2. 注册处理器
    * 在`custom/types/handlerTypes.js`中注册处理器
        `custom/types/handlerTypes.js`
        ```javascript
        let handlerTypes = {
            //=>格式：  <处理器变量名称> : <处理器文件名>
            GET_COLLECT_PLACES: 'getCollectPlaces'
        }

        //=>导出处理器
        module.exports = handlerTypes
        ```
3. 应用处理器
    `default/config/integrateFiles.conf.js`
    ```javascript
    ...
    module.exports = {
        ...
        resources: [
            {
                path: ...
                name: ...
                handler: [
                    <处理器文件名>,  //可省略扩展名
                    ...  //配置
                ]
            }
        ]
    }
    ```

### Integrate实例
```javascript
//=>结构示例
let integrate = {
    handlers: Object //处理器
    resources: Map //资源
    config: Object //全局配置
    addEventListener: Function //添加钩子监听
}
```

### 自定义插件
1. 定义插件
    位于`custom/plugins`，接收固定参数Integrate实例，接收可选的任意个、任意类型配置对象
    `custom/plugins/cycleGroupMovements.js`
    ```javascript
    /**
     * @param {Object} integrate Integrate实例
     * @option {Any} options 配置
     */
    module.exports = (integrate, options) => {
        //=>将普通资源添加进资源列表，以待写入文件
        integrate.resources.set(<资源变量名称>, <资源>)

        //=>如果资源是执行语句，需要转换成以"$$$"开头的字符串形式
        integrate.resources.set('aa', `$$$console.log('这是执行语句')`)
    }
    ```
2. 应用插件
    `default/config/integrateFiles.conf.js`
    ```javascript
    ...
    //=>引入插件
    const cycleGroupMovements = require('../../custom/plugins/cycleGroupMovements')
    ...

    module.exports = {
        ...
        plugins: [
            //=>注册插件
            (ig) => {
                cycleGroupMovements(
                    ig,   //Integrate实例
                    。。。 //配置
                )
            }
        ]
    }

    ```


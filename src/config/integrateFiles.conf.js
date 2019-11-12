module.exports = {
    //=>process.cwd()返回运行当前脚本的工作目录的路径
    // baseUrl: process.cwd(),
    files: [
        //=>文件路径是相对于引用的文件而言的相对路径，以/开头
        {
            path: '/resource/1.txt',
            callback: function(data) {
                return 'var places = ' + data + ';\n'
            }
        },
        // '/types/normalTypes.js',
        {
            path: '/utils/utils_createMovement.js',
            type: 'commonJS',
            name: 'createMovement'
        },
        {
            path: '/utils/utils_createStep.js',
            type: 'commonJS',
            name: 'createStep'
        },
        {
            path: '/config/movements.conf.js',
            type: 'commonJS',
            name: 'movements'
        },
        '/index.js'
    ],
    targetFile: '/_index.js'
}
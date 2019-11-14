//------------------------(未完成)改写成纯函数----------------------------//

const fs = require('fs')
const fap = require('./utils_getFileAbsolutePath')
const ws = require('./utils_writeStream')
const { wrapCallback } = require('./utils_pp')
const formatFunction = require('./utils_exportFunctionStringToNormal')

/**
 * 
 * @param {Array} fileArray 
 *  {String | Object}  fileArray Item
 *      {String}: file's relative path
 *      {Object}: file's options
 *          {
 *              {String} path
 *              {Function} callback
 *                  @param {String} fileContent
 *                  @return {String} modifiedContent
 *          }
 * @param {String} targetFile
 * @return {String} content of the final file
 */
function integrateFiles(fileArray, targetFile) {
    if (!Array.isArray(fileArray)) return
    let res = []
    let len = fileArray.length
    let getFAP = fap()
    let count = 0
    let wrapedCallback = wrapCallback(function () {
        //=>全部读取完毕，写入文件
        if (count === len) {
            console.log('整合文件写入成功')
            ws(res, targetFile)
        }
    })

    for (let i = 0; i < len; i++) {
        let fileItem = fileArray[i]

        switch (typeof fileItem) {
            case 'string':
                fs.readFile(getFAP(fileItem), function (err, data) {

                    wrapedCallback(()=>{
                        count++
                        res[i] = data.toString()
                    }, err, data)

                })
                break;
            case 'object':
                fs.readFile(getFAP(fileItem.path), function (err, data) {
                    data = data.toString()
                    wrapedCallback(()=>{
                        count++
                        if (fileItem.type) {
                            if (fileItem.type === 'commonJS') {
                                data = formatFunction(data, fileItem.name)
                            }
                        }

                        if (fileItem.callback) {
                            data = fileItem.callback(data)
                        }
                        res[i] = data
                    })

                })
                break;
        }
    }

}



module.exports = integrateFiles
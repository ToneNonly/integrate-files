#!/usr/bin/env node
//----------------------nodejs解析标识--------------------------//


//--------------------------导出EXCEL中有用的信息-------------------------//


/*********************根据文件更新的部分********************/
const from = 1,
    // to = 138,
    to = 11,
    column = 'A',
    sheetName = '整理'
/***********************end******************************/

/**
 * 获取文件的绝对路径
 * @param 
 *  relativePath: string
 * @return
 *  absolutePath: string
 */
const getFAP = require('../utils/utils_getFileAbsolutePath')()

const XLSX = require('xlsx')

const fs = require('fs')

const workbook = XLSX.readFile(getFAP('/resource/1_1.xlsx'))

const sheet = workbook.Sheets[sheetName]

let arr = []

for (let i = from; i < to; i++) {
    arr.push(sheet[column + i].v)
}

//=>将需要收藏的条目写入TXT文件

fs.writeFileSync(getFAP('/resource/1.txt'), JSON.stringify(arr))
console.log('TXT文件写入成功')


//----------------2019.11.11更新------------------//
//----------------将文件一起写入_index.js----------//
const IF = require('../utils/utils_integrateFiles')
const {files, targetFile} = require('../custom/config/integrateFiles.conf')
IF(files, targetFile)
//--------------end-----------------------------//


//=>把结果写入剪切板
/**
 * 用nodejs调用系统命令，实现将内容复制到剪切板
 * 因为nodejs默认是UTF-8编码，系统默认GBK编码，所以用iconv-lite转码
 * 最后实际调用的是：echo [内容] | pbcopy
 * PS：终端粘贴的命令是: pbpaste
 */
// const { exec } = require('child_process');
// const iconv = require('iconv-lite');
// exec('pbcopy').stdin.end(iconv.encode(writeContent, 'gbk'));
// console.log('文件复制成功')



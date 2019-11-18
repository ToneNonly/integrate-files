const toFullString = require('../utils/utils_toFullString')


/**
 * INTEGRATE FILES ON THE BASIS OF SPECIFIC OBJECT
 * @param {WriteStream} writeStream
 * @param {Object} rsources 
 * @param {Function} beforeWrite
 * @param {Function} afterWrite
 * @return {String} content of the final file
 */
async function integrateFiles({
    writeStream, 
    resources, 
    beforeWriteSingleFile, 
    afterWriteSingleFile, 
    coding = "UTF8"
}) {

    let result = ''
    for (let [name, val] of resources) {
        beforeWriteSingleFile({
            hasWrite: result,
            current: val,
            name,
            whole: resources
        })
        let data = `let ${name} = `
        if (typeof val === 'string' && val.indexOf('$$$') === 0) data += `${val.substring(3)};;\n` 
        else data += `${toFullString(val)};; \n`
        // if (typeof val === 'string') data = `let ${name} = ${val};;\n`
        // else data = `let ${name} = ${JSON.stringify(val)};;\n`
        result += data
        await writeStream.write(data, coding)
        afterWriteSingleFile({
            hasWrite: result,
            current: val,
            name,
            whole: resources
        })
    }

    return result;

}


module.exports = integrateFiles
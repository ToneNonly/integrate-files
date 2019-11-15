/**
 * INTEGRATE FILES ON THE BASIS OF SPECIFIC OBJECT
 * @param {WriteStream} writeStream
 * @param {Object} rsources 
 * @param {Array} beforeWrite
 * @param {Array} afterWrite
 * @return {String} content of the final file
 */
async function integrateFiles(writeStream, resources, beforeWrite, afterWrite, batchFunctions, coding = "UTF8") {

    let result = ''
    for (let name in resources) {
        batchFunctions(beforeWrite, result)
        let data = `let ${name} = ${JSON.stringify(resources[name])};;\n`
        result += data
        await writeStream.write(data, coding)
        batchFunctions(afterWrite, result)
    }

    return result;

}


module.exports = integrateFiles
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
    for (let name in resources) {
        beforeWriteSingleFile(result)
        let data = `let ${name} = ${JSON.stringify(resources[name])};;\n`
        result += data
        await writeStream.write(data, coding)
        afterWriteSingleFile(result)
    }

    return result;

}


module.exports = integrateFiles
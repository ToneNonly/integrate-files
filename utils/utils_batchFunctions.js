/**
 * BATCH EXECUTE FUNCTIONS
 * @param {Array} arr 
 * @param {Object} thisArgs
 * @param {Array} args
 */
module.exports = function batchFunctions(arr, thisArgs, ...args) {
    if (!Array.isArray(arr)) return
    arr.forEach(val => {
        val.apply(thisArgs, args)
    })
}